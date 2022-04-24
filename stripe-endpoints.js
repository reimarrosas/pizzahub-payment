const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/payment-sheet", async (req, res) => {
  const price = Math.ceil(req.body.price * 100);

  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2020-08-27" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "cad",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: "pk_test_A7jK4iCYHL045qgjjfzAfPxu",
  });
});

exports.router = router;
