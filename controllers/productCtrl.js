const Products = require('../models/productModel')
const Type = require('../models/typeModel')
const DetailProduct = require('../models/detailProductModel')
const feedbackCtrl = require('./feedback/feedbackCtrl');
// Filter, sorting and paginating


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //    gte = greater than or equal = lớn hơn hoặc bằng
        //    lte = lesser than or equal = nhỏ hơn hoặc bằng
        //    lt = lesser than = ít hơn
        //    gt = greater than = lớn hơn 
        // regex = search to nung sue 
        this.query.find(JSON.parse(queryStr))
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { types, title, description, images, category } = req.body;
            var listType = [];
            for (var i = 0; i < types.length; i++) {
                const typeItem = new Type({
                    name: types[i].name,
                    price: types[i].price,
                    amount: types[i].amount,
                });
                listType.push(typeItem);
            }
            const price = types[0].price;
            if (!images)
                return res.status(400).json({ msg: "Không có hình ảnh tải lên" });
            const product = await Products.findOne({ title: title });
            console.log(title);
            if (product)
                return res.status(400).json({ msg: "Sản phẩm này đã tồn tại." });
            const newProduct = new Products({
                types: listType,
                title: title,
                description: description,
                images: images,
                category: category,
                price: price,
            });
            await newProduct.save();
            res.json({ msg: "Product create!", newProduct });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal Server" });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Đã xóa một sản phẩm" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { type, title, description, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "Không có hình ảnh tải lên" })

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                type, title: title.toLowerCase(), description, images, category
            })

            res.json({ msg: "Đã cập nhật một sản phẩm" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    searchProduct: async (req, res) => {
        try {
            const { searchToken } = req.body
            const products = await Products.find({ title: { "$regex": searchToken, "$options": "i" } });
            res.send(JSON.stringify(products));
        }
        catch (error) {
            res.send(JSON.stringify(error))
        }
    },
    getDetailProduct: async (req, res) => {
        try {
            const productId = req.params.id
            const product = await Products.findOne({ _id: productId })
            const feedback = await feedbackCtrl.getFeedbackByProductID(productId);
            const newDetailProduct = new DetailProduct({
                types: product.types,
                title: product.title.toLowerCase(),
                description: product.description,
                images: product.images,
                category: product.category,
                feedbacks: feedback

            });
            res.send(JSON.stringify(newDetailProduct))
        }
        catch (error) {
            res.send(JSON.stringify(error))
        }
    },
    buyProduct: async (amount, typeId, productId) => {
        console.log("amount: " + amount + " typeId: " + typeId);
        const product = await Products.findOne({ _id: productId });
        const types = product.types.map((type) => {
            if (type._id == typeId) {
                type.amount = type.amount - amount;
            }
        });
        console.log(types)
        // if (type.amount < amount) {
        //     return false;
        // } else {
        //     await Type.findOneAndUpdate({
        //         amount: type.amount - amount
        //     });
        //     return true
        // }
    }

}
module.exports = productCtrl