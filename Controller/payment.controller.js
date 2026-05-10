import stripe from "../config/stripe.js";

const postPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecrete: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  }
};


export {postPayment}