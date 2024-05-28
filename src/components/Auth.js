import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Auth = () => {
  const { login, signup } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      if (username && password) {
        await login(username, password);
      } else {
        setError("Username and password are required");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      if (username && password) {
        await signup(username, password);
      } else {
        setError("Username and password are required");
      }
    } catch (err) {
      setError("Error signing up. Please try again.");
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear previous errors when toggling mode
  };

  return (
    <div className="bg-brown-200 p-8 rounded-lg shadow-lg border-4 border-brown-400 w-full max-w-md pixel-font">
      <h2 className="text-2xl mb-4 text-center text-brown-800">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <div className="mb-4">
          <label
            className="block text-brown-800 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-800 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-brown-800 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            onClick={toggleAuthMode}
          >
            {isLogin ? "Need to sign up?" : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
