import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const rate = Math.round(rating.rate);
  // creating a prime delivery on randomize logic as Math.random creates a no. between 0 & 1 so if it is below 0.5 then it will not be a Prime delivery else it will be!
  const [hasPrime] = useState(Math.random() < 0.5);
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
      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5 font-medium">
        <Currency quantity={price} currency='GBP' />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            src='https://links.papareact.com/fdw'
            alt='prime logo'
            className='w-12'
          />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
};

export default Product;
