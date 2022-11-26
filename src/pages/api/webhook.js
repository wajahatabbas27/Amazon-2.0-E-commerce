// To generate the certificate of the event we are using micro
// to know from where the event is
import { buffer } from "micro";

// admin technically has access to everything
import * as admin from "firebase-admin";

// Secure a connection to firebase
// Getting the file which we copied from the firebase console
const serviceAccount = require("../../../permissions.json");

//============================================================================
// checking the app is there or we need to create it
// If there is no app so create it using the service Account credentials
// Else use the app that is already there
// Secure a connection to firebase from the backend
//============================================================================
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish Connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// This is the secret that was created for the webhook
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

//============================================================================
// Fulfill order function that will save the data to the database
// we are creating it a seperate function to avoid the mess.
//============================================================================
const fullfillOrder = async (session) => {
  console.log("Fullfilling order : ", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.price_data.unit_amount / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
    });
};

export default async (req, res) => {
  // In nextjs we look like this that it is a POST request or a GET request
  if (req.method === "POST") {
    //================================================================================================
    // generating certificate to validate that the event occured towards the webhook is from stripe
    //================================================================================================
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;

    // Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("error ==>> ", err.message);
      return res.status(400).json(`err:  ${err.message} `);
    }

    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order which basically means putting / storing the data inside the database
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error : ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
