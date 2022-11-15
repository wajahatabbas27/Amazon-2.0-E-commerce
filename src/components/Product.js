import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  // dispatch from react redux
  const dispatch = useDispatch();

  const rate = Math.round(rating.rate);
  // creating a prime delivery on randomize logic as Math.random creates a no. between 0 & 1 so if it is below 0.5 then it will not be a Prime delivery else it will be!
  const [hasPrime] = useState(Math.random() < 0.5);

  //================================================================================================================================
  // This function is trigered every time we click to the button add to basket
  // Here we will going to add the products to the redux store by using the action we created inside the basket--slice
  //================================================================================================================================
  const addItemToBasket = () => {
    //Product we will have here that we will going to add
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime
    };

    // we will dispatch the action to add to the basket
    // we have that product that we will pass in the basket using the dispatch function and addToProduct action
    // Sending the product as an action to the Redux store
    dispatch(addToBasket(product));
    // console.log("Product Added", product);
  };

  return (
    <div className='relative flex flex-col m-5 bg-white p-10 z-30'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit='contain' />
      <h4 className='my-3'>{title}</h4>
      {/* stars for rating - creating it an array as well to be mapped by Array */}
      <div className='flex'>
        {Array(rate)
          .fill()
          .map((_, i) => (
            <StarIcon className='h-5 text-yellow-500' key={i} />
          ))}
      </div>
      <p className='text-xs my-2 line-clamp-2'>{description}</p>

      <div className='mb-5 font-medium'>
        <Currency quantity={price} currency='GBP' />
      </div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img
            src='https://links.papareact.com/fdw'
            alt='prime logo'
            className='w-12'
            loading="lazy"
          />
          <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
        </div>
      )}

      {/* By hitting this button we will add products to the basket in the redux store we created! */}
      <button onClick={addItemToBasket} className='mt-auto button'>
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
