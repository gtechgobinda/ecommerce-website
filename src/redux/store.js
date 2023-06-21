import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice.jsx";
import filterReducer from "./slice/filterSlice.jsx";
import productReducer from "./slice/productSlice.jsx";

const rootReducer=combineReducers({
    auth:authReducer,
    product:productReducer,
    filter:filterReducer,
    cart:cartReducer,
})

const store=configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;