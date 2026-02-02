
/**
 * Global Application Context
 * --------------------------
 * This context is used to share global state (products, orders,
 * users, loading state, etc.) across the application without
 * prop drilling.
 */

import { createContext } from "react";

// Create a global context object
const myContext = createContext();

// Export context to be used by Provider and consumers
export default myContext;
