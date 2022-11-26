const paypal = require('paypal-rest-sdk')
const Orders = require('../../models/order/orderModel')

const paypalCtrl = {

    payment: async (res, amount, address, order_id) => {
        try {
            const payment = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:5000/api/paypal/success",
                    "cancel_url": "http://localhost:5000/api/paypal/cancel"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": order_id,
                            "sku": "001",
                            "price": amount,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "address": {
                        "recipient_name": address
                    },
                    "amount": {
                        "currency": "USD",
                        "total": amount
                    },
                    "description": "This is the payment description."
                }]
            };
            await paypal.payment.create(payment, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.json({ url: payment.links[i].href })
                        }
                    }
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },
    success: async (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            "payer_id": payerId
        };
        await paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                console.log(error.response);
                res.status(401).send("Error");
                throw error;
            } else {
                try {
                    const order_id = payment.transactions[0].item_list.items[0].name;
                    await Orders.findByIdAndUpdate({ _id: order_id }, { status: "Paid" });
                    res.send('Success');
                }
                catch (err) {
                    console.log(err);
                    res.status(401).send("Something went wrong, cant complete your order");
                }
            }
        });
    },

    cancel: async (req, res) => {
        res.status(406).send('Cancelled');
    }

}

module.exports = paypalCtrl