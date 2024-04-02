import {configureStore} from "@reduxjs/toolkit";
import categories from "./slices/categoriesSlice";
import auth from "./slices/authSlice";
import task from "./slices/taskSlice";
import statistics from "./slices/statisticsSlice";


const store = configureStore({
    reducer : {
        categories,
        auth,
        task,
        statistics
    }
})

export default store