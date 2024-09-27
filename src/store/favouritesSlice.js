import { createSlice } from "@reduxjs/toolkit";
import { addFavouritetoFirebase, db } from "../auth/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { isLoading } from "./countriesSlice";

const initialState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
      if (user) addFavouritetoFirebase(user.uid, action.payload);
    },
    clearFavourites(state) {
      state.favourites = [];
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite !== action.payload
      );
    },
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const getFavouriteFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = query(collection(db, `users/${user.uid}/favourites`));
    const querySnapshot = await getDocs(q);
    const favourites = querySnapshot.docs.map((doc) => doc.data().name);
    dispatch(getFavourites(favourites));
    dispatch(isLoading(false));
  }
};

export const { addFavourite, clearFavourites, removeFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
