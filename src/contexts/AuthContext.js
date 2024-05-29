import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/checkAuth",
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const signup = async (username, password) => {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    try {
      await axios.post("http://localhost:4000/api/auth/signup", {
        username,
        password,
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error signing up");
    }
  };

  const login = async (username, password) => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      const response = await axios.get(
        "http://localhost:4000/api/auth/checkAuth",
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error logging in");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error logging out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
