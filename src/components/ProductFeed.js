import React from "react";
import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-44 mx-auto'>
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        ))}

      {/*Showing Advertise Screen*/}
      <img className='md:col-span-full' src='https://links.papareact.com/dyz' />

      {/* Creating a big product screen of 2 col by col-span-2 */}
      <div className='md:col-span-2'>
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image, rating }) => (
            <Product
              key={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rating}
            />
          ))}
      </div>

      {/* Showing the rest of the products as well here by slice */}
      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        ))}
    </div>
  );
};

export default ProductFeed;
