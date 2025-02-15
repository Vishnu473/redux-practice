import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habit-tracker/habit-slice"

export default configureStore({
    reducer:{
        habits:habitReducer
    },
})