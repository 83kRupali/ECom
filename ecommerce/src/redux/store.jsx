
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

/**
 * Redux Store Configuration
 * - configureStore automatically sets up Redux DevTools
 * - Includes good defaults like redux-thunk and Immer
 */
export const store = configureStore({
  reducer: {
    // Cart reducer manages all cart-related state
    cart: cartReducer,
  },
});

export default store;




