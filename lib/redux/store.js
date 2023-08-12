import { configureStore } from "@reduxjs/toolkit";

import addressReducer from "./addressSlice";

export default configureStore({
    reducer: {
        address: addressReducer
    },
});