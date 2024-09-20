import axios from "axios";
import { getCountries, isLoading } from "../store/countriesSlice";

const baseUrl = "https://restcountries.com/v3.1/all";

const getAllCountries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const initializeCountries = () => {
  return async (dispatch) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulates a 1-second delay
    try {
      const countries = await getAllCountries(); // Fetches the countries data from the API
      dispatch(getCountries(countries)); // Dispatches the action to update the Redux store with the fetched countries data
    } catch (error) {
      console.error("Error fetching countries:", error); // Logs any errors that occur during the fetch
    } finally {
      dispatch(isLoading(false)); // Dispatches the action to update the loading state in the Redux store to false
    }
  };
};

export { getAllCountries, initializeCountries };
