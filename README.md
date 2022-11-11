# AMAZON 2.0 USING NEXTJS, NEXTAUTH, TAILWIND, REDUX, WEBHOOKS, FIRESTORE, STRIPE

## Redux

- we have store.js and basket there to implement the redux.

## Hero Icons

- yarn add @heroicons/react
- These are responsible from where we are actually taking search/basket/etc icons

## React Responsive Carousel

- yarn add react-responsive-carousel -- we are using this library over here.
- import { Carousel } from "react-responsive-carousel";
- import "react-responsive-carousel/lib/styles/carousel.min.css"; -- this styling is also needed to be imported there as well!
- This Carousel component we are using and it has many attributes we are using like:
- Autoplay - scroll by itself.
- infinite loop - It just loop back around by its own self once completed the cycle.
- showStatus={true} - shows the status that no. of the images that says 1 of 3 , 2 of 5
- showIndicators={true} - show small dots
- showThumbs={true} - show thumbnails images which are used inside the carousel
- interval={5000} - time bydefault is 3s but now we have given 5000 ms
- We will be having divs inside carousel which will have images inside of them, All that is needed here is that we require div according to our need and those which we will be using here!
- This library has many features included in it like its Responsive, mobile friendly, swipe to slide, mouse emulating touch, server side rendering compatible, keyboard navigation, custom animation duration, Auto play with custom interval, infinite loop, horizontal or vertical directions, Supports images, videos, text content or anything you want. Each direct child represents one slide!, Supports external controls.
- It is the slide show of the components in the images that are changing all the way, and it is called carousel!
- React carousel is a slideshow component for cycling through elements—images or slides of text—like a carousel.
- When ever we are using images tag inside carousel, we must use the tag loading="lazy" their bcz that is necessary their to slow the user experience!

## Server Side Rendering (SSR)

- We want all the products to be server side rendered here from the fakeStoreApi so there must be no latency!
- What we are actually doing is calling the api on server before it shows on the client side; The benefit of doing this is that we will be having all our data confirmed on the client side!
- export const getServerSideProps = async (context) => {
  // calling fakeApiStore -- GET-->> https://fakestoreapi.com/products
  const products = await fetch("https://fakestoreapi.com/products");
  const productResult = await products.json();

  return {
  props: {
  productResult,
  },
  };
  };

- The above code which we used is therefore here which helps us to to SSR.

## react-currency-formatter

- yarn add react-currency-formatter
- import Currency from 'react-currency-formatter';
- npm package for formatting the currency!
- We are using the currency formatter to format the currency!
- <Currency quantity={price} currency='GBP' />   -- this is how we will be using this component!



### Extra Informtion

- We have tailwindcs and redux already activated in this starter templete all that is require we will be going to add the features and functionalities inside of it!

- Applying emmet in settings, if we wanted to have the shortcuts over here!
- Auto Rename Tag - extention to automatically rename the tags!
- Image tag iptimize the image and serves them in the most optimize way!
- while using the link inside the src folder in image tag it is giving error that the links are not configured!
- created next.config.js file and there used the links which we will be using to call the images from!
- bg-amazon_blue - this is coming as the background color for us here as we have already setup it inside of the tailwind.config.css
- hidden sm:flex -- it is hidden bydefault but once it reaches the small screen it becomes flex.
- flex-grow -- property allows it to take as much room as possible when screen is getting bigger!
- flex-shrink -- The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink .
- focus:outline-none - to avoid blue outline that is there when we focus on!
- we can create our own utility classes intailwindcss in global.css by @layer.
- we just have to use the @apply just there so that to create our own utility class in the global.css and then use them inside the components!
- hidden md:inline - hidden opposite is inlne, once it is hidden but once medium screen is there make it inine.
- whenever we want something to be absolute so we wants its parent to be relative else it will be relative to that whole entire page!
- max-w-screen-2xl - It is the max screen we are giving to a container it will not going to pass it here all the way!
- mx-auto - this brings everything to the center horizontally
- bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20 - to use the gradient color in tailwind we use!
- bottom-0 -- The bottom property is used to set the value of the position of an element from the bottom of the viewport. If the position value is fixed or absolute, then the element adjusts its bottom edge with respect to the bottom edge of its parent element or the block that holds it. It holds the bottom of the screen there and gives the bottom their as well!
- key - whenever we are mapping in react key represents the id or the place where it is situated in an array which we mapped so it is needed else it gives us warning!
- {Array(rate)
  .fill()
  .map((\_, i) => (
  <StarIcon className='h-5' />
  ))} -- creating an array from a number to be mapped!
- require("@tailwindcss/line-clamp"  -- we have this line clamp inside tailwind config so for long descriptions we will be going to use it all the way! we want to clamp a line after 2 line means it will show ... 
- focus:outline-none focus:ring-2 -- when focus it ring and outline becomes none as well!
- active:from-yellow-500 -- It means when clicked it means it is active!
- grid-flow-row-dense  -->> row dense. Places items by filling each row, and fill any holes in the grid. Demo ❯ column dense. Places items by filling each column, and fill any holes in the grid.
- grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ---->>> creating the products into the grid!
- -mt-52  --> negative margin top will take it to the top instead give margin to it!
- col-span-full -- gets the whole space of the line!
- products.slice(0,4)  -- It breaks the array and slice it shows the first four and after that we show the ad.
- col-span-2 -- 2 columns ki jaga lega yh span-2!
- slice -- cuts the array from the initial value to a particular value and by which it shows the data to that index like products.slice(0,4).map() -- phr uske bd uspe map chala rhe hain slice krne ke bd!
- by using grid-flow-row-dense -- it uses all the space else if we donot use that so it leaves a big space then!