const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  // destructuring the post data from req.body
  const { items, email } = req.body;

  // As stripe accepts a particular format of the data therefore it is required that we must send the data in a particular format
  // transforming array for stripe
  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "gbp",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  //   Creating the stripe session with the credentials
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1M6sNVEKDELx1XBAStTiMNRC"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  // sending the respose back
  // the above information that we have provided to the stripe returns the session ID that we are actually returning all the way!
  res.status(200).json({ id: session.id });
};
