import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice"; //importing reducer from the countriesSlice.js

export const store = configureStore({
  reducer: {
    countries: countriesReducer, // Attaching the countries reducer to the store under the key "countries"
  },
});
