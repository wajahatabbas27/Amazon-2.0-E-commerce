import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { searchResults } from "../slices/basketSlice";
import Search from "../components/Search";

//=====================================================================
// Props here is a server side rendered return below which we run!
// We are destructuring it according to our requirements
//=====================================================================
export default function Home({ products }) {
  const Searcher = useSelector(searchResults);
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header products={products} />
      <main className='max-w-screen-2xl mx-auto'>
        {/* Scrollable Banner */}
        <Banner />
        {/* Products */}
        {Searcher.length > 0 ? <Search /> : <ProductFeed products={products} />}
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
  const session = await getSession(context);

  return {
    props: {
      products,
      session,
    },
  };
};
