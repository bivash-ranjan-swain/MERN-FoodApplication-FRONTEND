import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContextStore.jsx";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let ignore = false;

    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/auth/get-user",
          { withCredentials: true }
        );
        if (!ignore) setUser(response.data.user);
      } catch (err) {
        if (!ignore) setUser(null);
        console.log(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      ignore = true;
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8800/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    setLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};