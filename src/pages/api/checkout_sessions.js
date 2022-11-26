const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // getting stripe with the secret key as well!

export default async (req, res) => {
  // destructuring the post data from req.body
  const { items, email } = req.body;

  try {
    //==================================================================================================================================
    // As stripe accepts a particular format of the data therefore it is required that we must send the data in a particular format
    // transforming array for stripe
    //==================================================================================================================================
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "gbp",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
      quantity: 1,
    }));

    //==================================================================================================================================
    //Creating the stripe session with the credentials
    //==================================================================================================================================
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // shipping_options: ["shr_1M6sNVEKDELx1XBAStTiMNRC"],
      // shipping_address_collection: {
      //   allowed_countries: ["GB", "US", "CA"],
      // },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      // adding the metadata for the webhook
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    });

    //==================================================================================================================================
    // sending the respose back
    // the above information that we have provided to the stripe returns the session ID that we are actually returning all the way!
    //==================================================================================================================================
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log("error ", error);
  }
};
