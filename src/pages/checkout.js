import React from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// here we will be adding the public key provided by stripe so we can connect with the stripe!
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  //Getting the state of the item from the basket slice
  const items = useSelector(selectItems);

  //   getting total from the selector inside the reducer
  const total = useSelector(selectTotal);

  const { data: session } = useSession();

  // create Checkout Session function will be triggered when we click to proceed to checkout
  // Implementing stripe functionality
  const createCheckoutSession = async () => {
    // loading stripe
    const stripe = await stripePromise;

    // Call the backend to create a ceckout session
    // Creating POST request with Axios.
    // sending the selected items inside the post request with the email of the user
    const checkoutSession = await axios.post("/api/checkout_sessions", {
      items: items,
      email: session.user.email,
    });

    // Redirect user/customer to Stripe Checkout
    // It redirects to the checkout page after the payemnt process
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    //========================================================================================
    // handling for the res-500  server error!
    // validating the result if there is error
    //========================================================================================
    if (result.error) alert(result.error.message);

    // save data here inside the firebase
    // design the database with the email and then products that are buyed!

    
  };

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Checkout</title>
      </Head>

      <Header />
      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* left section added products */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0
                ? "Your Amazon Basket is Empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct key={i} item={item} />
            ))}
          </div>
        </div>
        {/* right section stripe payment and total count of the bill to checkout*/}
        <div className='flex flex-col bg-white p-10'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal ({items.length} items):{" "}
                <span className='font-bold'>
                  <Currency quantity={total} currency='GBP' />
                </span>
              </h2>
              <button
                className={`button mt-2 
                ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }
                  `}
                role='link'
                onClick={createCheckoutSession}
                disabled={!session}
              >
                {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
