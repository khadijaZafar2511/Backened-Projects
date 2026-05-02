import express from "express"
import stripe from "../config/stripe.js";

const routerpay = express.Router()

routerpay.post("/", async(req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        });

res.json({clientSecrete:paymentIntent.client_secret})


    } catch (err) {
        console.error(err.stack)
        res.status(500).send("Internal Server Error")

    
    }
})


export default routerpay;

// import express from 'express';
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Use express.raw only for the webhook endpoint
// app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     // Verify the request actually came from Stripe
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the "Payment Successful" event
//   if (event.type === 'payment_intent.succeeded') {
//     const paymentIntent = event.data.object;
//     const orderId = paymentIntent.metadata.orderId; // Retrieve your Order ID

//     // Update your database here
//     await Order.findByIdAndUpdate(orderId, { status: "Paid", paymentStatus: "Success" });
//     console.log(`Order ${orderId} marked as PAID!`);
//   }

//   res.json({received: true});
// });