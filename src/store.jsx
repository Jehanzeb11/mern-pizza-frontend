import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import { productsApi } from "./slices/fetchQuery";
import productSlice from "./slices/productSlice";
import orderSlice from "./slices/orderSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartSlice,
        auth:authSlice,
        order:orderSlice,
        users:userSlice,
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productsApi.middleware)
    }
})


export default store