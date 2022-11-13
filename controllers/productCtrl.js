const Products = require('../models/productModel')

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
            const { product_id, type, title, description, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "Không có hình ảnh tải lên" })

            const product = await Products.findOne({ product_id })
            if (product)
                return res.status(400).json({ msg: "Sản phẩm này đã tồn tại." })

            const newProduct = new Products({
                product_id, type, title: title.toLowerCase(), description, images, category
            })

            await newProduct.save()
            res.json({ msg: "Đã tạo ra một sản phẩm", newProduct })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
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
            const { type, title, description, images, category} = req.body;
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
    }
}


module.exports = productCtrl