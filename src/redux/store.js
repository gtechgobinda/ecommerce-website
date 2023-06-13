import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice.jsx";

const rootReducer=combineReducers({
    auth:authReducer,
    product:productReducer,
})

const store=configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;