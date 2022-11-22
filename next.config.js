// configuration file for the nextjs links which we will going to use!
module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  // this gives us nextjs environment keys which we will be using all the way
  env: {   
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  },
};
