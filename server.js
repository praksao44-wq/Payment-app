// Install: npm install express stripe body-parser cors
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")("YOUR_SECRET_KEY"); // Replace with your Stripe secret key

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/pay", async (req, res) => {
    try {
        const { paymentMethodId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents ($10)
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true
        });

        res.send({ success: true, paymentIntent });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
