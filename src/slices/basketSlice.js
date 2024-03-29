import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  items: [],
  searchResultArray: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // using id we are removing from the state
      // first finding the index using the id
      // and on that index we are running splice function to cut the index that we found
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      // we are creating the copy of the basket
      let newBasket = [...state.items];
      if (index >= 0) {
        // The item exist in the Basket... so remove it
        // removing using splice function
        newBasket.splice(index, 1);
      } else {
        // send warning
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as its not in the Items`
        );
      }
      state.items = newBasket;
    },
    addToSearching: (state, action) => {
      state.search = action.payload;
    },
    searchResult: (state, action) => {
      const products = action.payload;
      const search = state.search;
      const result = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
      );
      state.searchResultArray = result;
      console.log("result =", state.searchResultArray);
    },
    searchResultToEmpty: (state, action) => {
      state.searchResultArray = [];
    },
  },
});

// we export them so we can use these actions throughout the application
export const {
  addToBasket,
  removeFromBasket,
  addToSearching,
  searchResult,
  searchResultToEmpty,
} = basketSlice.actions;

//selector is used to get the states like here from the basket we will going to use the selecter
// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

// total price of the items added inisde the basket
// we will calculate the total from reduce es6 function
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

// search
export const search = (state) => state.basket.search;

export const searchResults = (state) => state.basket.searchResultArray;

export default basketSlice.reducer;
