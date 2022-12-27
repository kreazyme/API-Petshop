const admin = require("firebase-admin");

const notiCtrl = {
    pushNoti: async (delivery_id, res) => {
        // const { title, body, device_tokens } = req.body;

        // if (!title) return res.status(400).json({ error: "A message title is required" });

        // if (!body) return res.status(400).json({ error: "A message body is required" });

        // if (!device_tokens)
        //     return res.status(400).json({ error: "A set of device tokens are required" });

        // if (!Array.isArray(device_tokens))
        //     return res.status(400).json({ error: "Property device_tokens must be of type array" });

        const title = "Order confirmed";

        const body = `Your order has been confirmed. Please wait for the delivery. Your delivery is ${delivery_id}`

        console.log("title: ", title);

        const payload = {
            notification: {
                title: title,
                body: body,
            },
        };

        const options = {
            priority: "normal",
            timeToLive: 60 * 60,
        };

        let errors = [];
        admin
            .messaging()
            .sendToDevice("f12pjsWcTHijugxUeMMNb0:APA91bFS7lUa6DZN3VI6PIg-dp9h7DU81jDFHmkOJcB9rkif3DSk_20RI7LAGGytCoP9W_iUDT47Zs1powNwJHVB6lTP0nmpcM0bTOyxUeewQwvoeGOksGR1fzIYpvqrjOUUL8vBM_5x", payload, options)
            .catch((error) => {
                errors.push(error);
            });
        if (errors.length === 0) {
            return res.send({ message: "Message broadcasted successfully" });
        } else {
            return res.status(500).json({ errors: errors });
        }
    },
};

module.exports = notiCtrl;
