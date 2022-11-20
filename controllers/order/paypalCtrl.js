const paypal = require('paypal-rest-sdk')

const paypalCtrl = {

    payment: async (req, res) => {
        try {
            // const { amount, address, cart, phone, name, email } = req.body;
            // const total = amount * 23000;
            // const order = new Order({
            //     user_id: req.user.id,
            //     name,
            //     email,
            //     phone,
            //     address,
            //     cart,
            //     amount,
            //     total
            // })
            // await order.save();
            const payment = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://facebook.com",
                    "cancel_url": "http://instagram.com"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "iphone14",
                            "sku": "item",
                            "price": "20.00",
                            "currency": "USD",
                            "quantity": 2
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": "40.00"
                    },
                    "description": "This is the payment description."
                }]
            };
            paypal.payment.create(payment, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    // res.send(JSON.stringify(payment));
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.json({ url: payment.links[i].href })
                        }
                    }
                }
            })
            console.log("Ok")
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = paypalCtrl