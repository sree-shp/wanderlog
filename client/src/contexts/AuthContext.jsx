import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "signup":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

export function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password, setLoading, setError) {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/user/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "login", payload: res.data.data.user });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Something went Wrong");
      setTimeout(() => setError(""), 3000);
      console.log(err.message);
    }
  }

  async function signup(
    name,
    email,
    password,
    confirmPassword,
    setLoading,
    setError
  ) {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/user/signup`,
        {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "signup", payload: res.data.data.newUser });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Something went Wrong");
      setTimeout(() => setError(""), 3000);
      console.log(err.message);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}
