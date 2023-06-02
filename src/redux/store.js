import {configureStore, combineReducers} from "@reduxjs/toolkit"

import authReducer from './slice/AuthSlice'
import productReducer from './slice/productSlice'
import FilterReducer from "./slice/FilterSlice"
import cartReducer from "./slice/CartSlice"
import checkoutReducer  from "./slice/CheckoutSlice"      

const rootReducer=combineReducers({
        auth: authReducer,
        product: productReducer,
        filter: FilterReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
    
    
})


const store = configureStore({

    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     
      serializableCheck: false,
    }),

    
    
})

export default store;