import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  item: { id, title, price, description, category, image, rating, hasPrime },
}) => {
  // dispatch
  const dispatch = useDispatch();

  // star rating
  const rate = Math.round(rating.rate);

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
      hasPrime,
    };

    // we will dispatch the action to add to the basket
    // we have that product that we will pass in the basket using the dispatch function and addToProduct action
    // Sending the product as an action to the Redux store
    dispatch(addToBasket(product));
    // console.log("Product Added", product);
  };

  //  Removing items from the basket and using the action
  const removeItemFromBasket = () => {
    // removing the item from redux we are using the id 
    dispatch(removeFromBasket({id}));
  };

  return (
    <div className='grid grid-cols-5'>
      <Image src={image} height={200} width={200} objectFit='contain' />
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
          {Array(rate)
            .fill()
            .map((_, i) => (
              <StarIcon className='h-5 text-yellow-500' key={i} />
            ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <Currency quantity={price} currency='GBP' />
        {hasPrime && (
          <div className='flex items-center space-x-2'>
            <img
              loading='lazy'
              src='https://links.papareact.com/fdw'
              alt='prime logo'
              className='w-12'
            />
            <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Right add/remove button */}
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button className='button' onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className='button' onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
