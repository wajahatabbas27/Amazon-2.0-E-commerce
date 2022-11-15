import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react"; // This is what we will be using to handle signin functionality
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

//===================================================================================================================================
// Here inisde the header when we click the accounts & list we have to be redirected to the signIn page from different providers!
//===================================================================================================================================

const Header = () => {
  // We will use the useSession here to get the data from the login user
  const { data: session } = useSession();

  //to route we will use useRouter
  const router = useRouter();

  // selecter to get the state from the redux store
  const item = useSelector(selectItems);

  return (
    <header>
      {/*Top Nav*/}
      <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
        {/* Logo */}
        <div className='mt-2 items-center flex-grow sm:flex-grow-0'>
          <Image
            onClick={() => router.push("/")}
            src='https://links.papareact.com/f90'
            width={150}
            height={40}
            objectFit='contain'
            className='cursor-pointer'
          />
        </div>
        {/* Custom search Bar*/}
        <div className=' items-center hidden sm:flex h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 '>
          <input
            type='text'
            className='p-2 h-full w-6 flex-grow rounded-l-md flex-shrink px-4 focus:outline-none'
          />
          <SearchIcon className='h-12 p-4' />
        </div>
        {/* Hero Icons Basket */}
        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          {/* name */}
          <div
            onClick={!session ? signIn : signOut}
            className='link cursor-pointer'
          >
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className='font-extrabold md:text-sm'>Account & Lists</p>
          </div>
          {/* order */}
          <div className='link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& orders</p>
          </div>
          {/* basket - cart */}
          <div
            onClick={() => router.push("/checkout")}
            className='relative link flex items-center'
          >
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
              {/* calling directly from the redux when we actually update the state */}
              {item.length}
            </span>
            <ShoppingCartIcon className='h-10' />
            <p className='hidden md:inline font-extrabold md:text-sm mt-2'>
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Nav */}
      <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
        <p className='flex link items-center'>
          <MenuIcon className='h-6 mr-1' />
          All
        </p>
        <p className='link '>Prime Video</p>
        <p className='link '>Amazon Business</p>
        <p className='link '>Today's Deals</p>
        <p className='link hidden lg:inline-flex'>Electronics</p>
        <p className='link hidden lg:inline-flex'>Food & Grocery</p>
        <p className='link hidden lg:inline-flex'>Prime</p>
        <p className='link hidden lg:inline-flex'>Buy Again</p>
        <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
        <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
