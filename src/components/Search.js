import React from "react";
import { useSelector } from "react-redux";
import { searchResults } from "../slices/basketSlice";
import Product from "./Product";

const Search = () => {
  const Searcher = useSelector(searchResults);

  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-44 mx-auto'>
      {Searcher.map(
        ({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        )
      )}
    </div>
  );
};

export default Search;
