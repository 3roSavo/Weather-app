import mainReducer from "../reducers/mainReducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: mainReducer
})
export default store