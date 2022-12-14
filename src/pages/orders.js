import React from "react";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import moment from "moment/moment";
import Order from "../components/Order";

const Orders = ({ orders }) => {
  const { data: session } = useSession();

  console.log(orders);

  return (
    <div>
      <Header />

      <main className='max-w-screen-lg mx-auto p-10 '>
        <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-500'>
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} orders</h2>
        ) : (
          <h2>Please Sign-In to see your order</h2>
        )}

        <div className='mt-5 space-y-4'>
          {orders.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //   Get the users logged in credentials - using getSession on the server side
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  //   fetching the data from the firebase
  //   orderBy
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("order")
    .orderBy("timestamp", "desc")
    .get();

  // Stripe orders
  // we have all the async promises in stripe therefore we will going to call the promises.all
  //   epoc unic back to date
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
}
