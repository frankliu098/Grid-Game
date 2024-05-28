import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:4000/checkAuth", {
          withCredentials: true,
        });
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
    await axios.post("http://localhost:4000/signup", { username, password });
  };

  const login = async (username, password) => {
    await axios.post(
      "http://localhost:4000/login",
      { username, password },
      { withCredentials: true }
    );
    const response = await axios.get("http://localhost:4000/checkAuth", {
      withCredentials: true,
    });
    setUser(response.data);
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:4000/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
