import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for cart
 * - Loads cart data from localStorage if available
 * - Otherwise initializes with an empty array
 */
const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ================= ADD TO CART =================
    /**
     * Adds a product to the cart
     * - If product already exists → increase quantity
     * - If product is new → add with quantity = 1
     */
    addToCart(state, action) {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        // Product already in cart → increase quantity
        state[itemIndex].quantity += 1;
      } else {
        // New product → add to cart
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    // ================= DELETE FROM CART =================
    /**
     * Removes a product from cart using product id
     */
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },

    // ================= INCREMENT QUANTITY =================
    /**
     * Increases quantity of a specific product
     */
    incrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // ================= DECREMENT QUANTITY =================
    /**
     * Decreases quantity of a product
     * - Quantity will not go below 1
     */
    decrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // ================= CLEAR CART =================
    /**
     * Clears entire cart (used after order placed or logout)
     */
    clearCart() {
      return [];
    },
  },
});

// Export actions
export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;


