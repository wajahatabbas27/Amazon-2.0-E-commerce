# AMAZON 2.0 USING NEXTJS, NEXTAUTH, TAILWIND, REDUX, WEBHOOKS, FIRESTORE, STRIPE

- Deployment on Vercel: https://iz-commerce.vercel.app/

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
- <Currency quantity={price} currency='GBP' /> -- this is how we will be using this component!

## Next Auth!

- yarn add next-auth
- We are using Next Auth for the authentication purpose that we wanted to login so authenticating using google in our e-commerce website!
- Now we will be implementing the Auth using prebuild nextAuth that will going to help us to authorize the user and log them in.
- The best part of using the nextAuth Authentication is that we will be having it done on the serverSide rendered.
- [...nextauth].js - this will be the file inside api>auth folder in pages.
- In the above dynamic file we will going to add the logic all the way for the next authentication.
- This file will be responsible to handle all the authentication in the project.
- We have providers in the auth, by these we will going to login and authenticate in the application.
- Created the nextAuth file where we are using the providers that we want to signin with, we will going to configure them!
- we want that when the user clicks account & lists so he has to be redirected to the signin page we have been provided by the nextauth different providers which we will use to sign in into our application.
- import { signIn, signOut, useSession } from "next-auth/react"; -- these are very powerful functions that we will going to use inside the header component that when we click the account we must be directed to the signIn page provided to us by next-auth.
- Simple we have to use the onClick={signIn} function to get on the provided signIn page by the nextauth!
- after clicking signin with google getting this error mismatch uri : Error 400: redirect_uri_mismatch
- after resolving the error we are signed in from google but to get the state of the user data we have to do something as well!
- Inside _app.js file in pages we have to add the following 
- import { SessionProvider } from "next-auth/react";
- We will wrap the whole application by <SessionProvider></SessionProvider> with attribute of session  -- what we actually do here is give the access of Authentication to the entire application.
- onClick={!session ? signIn : signOut} -- If there is session so sign out else sign in

- For clientId and secret of the sources to login!
- google credential : https://console.cloud.google.com/apis/credentials?pli=1&project=fir-75e60&supportedpurview=project
- facebook credentials : https://developers.facebook.com/apps/867138024708840/add/

## 400: redirect_uri_mismatch

- we need to add some data inside the configuration to give access from any point to signIn inside the applicaton.
- Inside of the googlecloud > select project from the dropdown > credentials > Authorised JavaScript origins
- add uri localhost - 3000
- and also the redirect uri, where we get the actual error!
- save the adding things then check again after signing in its working fine!

## Firebase

- yarn add firebase
- we will setup firebase for the authentication in the application to save the users that are logged in and have the session running to save those users we will going to have them save inside our firestore!
- Just created a new project on firebase.
- go to settings > click web icon > to register for a web app
- copy config file of the new web app you created!
- created firebase.js file at root and paste the config file there!

### firebase Authentication

- on Firebase console go to authentication > click get started
- now we will have authentication method by which we wanted to sign in there are multiple options available!
- like we click on google and click enable there we get the secret and id after saving, all we have to do is to save that inside the .env.local file.


### .env.local

- This is the file we are using to setup the environment variables! that we will be using inside our nextjs application
- we donot need qoutations "" inside our .env file
- Whenever we update the .env file restart the server!

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
- require("@tailwindcss/line-clamp" -- we have this line clamp inside tailwind config so for long descriptions we will be going to use it all the way! we want to clamp a line after 2 line means it will show ...
- focus:outline-none focus:ring-2 -- when focus it ring and outline becomes none as well!
- active:from-yellow-500 -- It means when clicked it means it is active!
- grid-flow-row-dense -->> row dense. Places items by filling each row, and fill any holes in the grid. Demo ❯ column dense. Places items by filling each column, and fill any holes in the grid.
- grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ---->>> creating the products into the grid!
- -mt-52 --> negative margin top will take it to the top instead give margin to it!
- col-span-full -- gets the whole space of the line!
- products.slice(0,4) -- It breaks the array and slice it shows the first four and after that we show the ad.
- col-span-2 -- 2 columns ki jaga lega yh span-2!
- slice -- cuts the array from the initial value to a particular value and by which it shows the data to that index like products.slice(0,4).map() -- phr uske bd uspe map chala rhe hain slice krne ke bd!
- by using grid-flow-row-dense -- it uses all the space else if we donot use that so it leaves a big space then!
- background gray pe white card bhi sahi lgrhe hain acha lgta hai
- In nextjs we have backend folder there as well bundle that is in pages folder and the folder is called the "api".
- This api backend folder will be used to fetch the apis of the backend or to authenticate!
- we donot require "" insdie the .env files
- Whenever we update the .env file restart the server!
