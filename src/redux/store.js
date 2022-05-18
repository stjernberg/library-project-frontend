import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "./librarySlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    categories: categoryReducer,
  },
});
