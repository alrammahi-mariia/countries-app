import { createSlice } from "@reduxjs/toolkit";

//Initial state of the "countries" slice
const initialState = {
  countries: [], // An array to hold country data
  isLoading: true, // A flag to indicate if data is being loaded
  search: "", // A search string to filter countries
};

// Creating a slice for "countries"
export const countriesSlice = createSlice({
  name: "countries", // Name of the slice
  initialState,
  reducers: {
    getCountries(state, action) {
      state.countries = action.payload; //Updates the countries state with the data passed in the action's payload.
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    search(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers() {}, // For handling actions from other slices or async actions
});

// Exporting the actions generated by createSlice
export const { getCountries, isLoading, search } = countriesSlice.actions;

// Exporting the reducer function to be used in the store
export default countriesSlice.reducer;
