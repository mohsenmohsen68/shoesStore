import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/users/Users"



const store = configureStore({
    reducer:{
        user: userReducer,
    }
})

export default store;