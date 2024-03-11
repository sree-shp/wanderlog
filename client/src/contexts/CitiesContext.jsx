import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import axios from "axios";
import { useAuth } from "./AuthContext";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  deletedCity: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        deletedCity: !state.deleteCity,
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { isAuthenticated } = useAuth();
  const [isHistoryActive, setIsHistoryActive] = useState(false);

  useEffect(
    function () {
      async function fetchCities() {
        dispatch({ type: "loading" });
        try {
          const res = await axios(
            `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/city`,
            {
              withCredentials: true,
            }
          );
          dispatch({ type: "cities/loaded", payload: res.data.data.cities });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading data",
          });
        }
      }
      fetchCities();
    },
    [currentCity, isAuthenticated]
  );

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });

      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/city/${id}`,
        {
          withCredentials: true,
        }
      );

      dispatch({ type: "city/loaded", payload: res.data.data.city });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data",
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/city`,
        {
          cityName: newCity.cityName,
          country: newCity.country,
          emoji: newCity.emoji,
          date: newCity.date,
          notes: newCity.notes,
          position: newCity.position,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "city/created", payload: res.data.data.city });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/city/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        isHistoryActive,
        setIsHistoryActive,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
