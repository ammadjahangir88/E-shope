import {configureStore, combineReducers} from "@reduxjs/toolkit"

import authReducer from './slice/AuthSlice'
import productReducer from './slice/productSlice'
import FilterReducer from "./slice/FilterSlice"
import cartReducer from "./slice/CartSlice"

const rootReducer=combineReducers({
        auth: authReducer,
        product: productReducer,
        filter: FilterReducer,
        cart: cartReducer,
    
    
})


const store = configureStore({

    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     
      serializableCheck: false,
    }),

    
    
})

export default store;