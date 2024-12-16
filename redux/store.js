import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/users/Users"
import commentReducer from "@/redux/comments/Comments"
import productReducer from "@/redux/products/Product"



const store = configureStore({
    reducer:{
        user: userReducer,
        comment: commentReducer,
        product: productReducer
    }
})

export default store;