import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)
const app = express();
app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to gtechshop website")
})
// const calculateOrderAmount = (items) => {
//   return 1400;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "inr",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

const PORT=process.env.PORT || 4242
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));