import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

//=====================================================================
// Props here is a server side rendered return below which we run!
// We are destructuring it according to our requirements
//=====================================================================
export default function Home({ products }) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        {/* Scrollable Banner */}
        <Banner />
        {/* Products */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

//=====================================================================
// ServerSide Rendering here
// Getting the Products before we show the page to the client
// https://fakestoreapi.com/products -- api endpoint here
//=====================================================================

export const getServerSideProps = async (context) => {
  // calling fakeApiStore -- GET-->> https://fakestoreapi.com/products
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};
