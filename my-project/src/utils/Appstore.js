 import {configureStore} from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import FeedReducer from './feedslice'
import connectionReducer from './connectionslise'
 const appstore=configureStore({
    reducer:{
        user:userReducer,
        feed:FeedReducer,
        connections:connectionReducer,

    },


})
export default appstore;