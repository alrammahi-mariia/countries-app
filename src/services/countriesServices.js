import axios from "axios";
import { getCountries, isLoading } from "../store/countriesSlice";

const baseUrl = "https://restcountries.com/v3.1/all";

const getAllCountries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const initializeCountries = () => {
  return async (dispatch) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const countries = await getAllCountries(); // Await the countries data
      dispatch(getCountries(countries)); // Now you can dispatch the countries data
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      dispatch(isLoading(false)); // Ensure loading state is updated
    }
  };
};

export { getAllCountries, initializeCountries };
