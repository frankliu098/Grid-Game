import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Auth = () => {
  const { signup, login, logout, user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      setError('');
      await signup(username, password);
      alert('Sign up successful. Please log in.');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      setError('');
      await login(username, password);
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brown-100">
      <div className="bg-brown-200 p-8 rounded-lg shadow-lg border-4 border-brown-400 w-full max-w-md pixel-font">
        <h2 className="text-3xl font-bold mb-6 text-center text-brown-800">{user ? `Welcome, ${user.username}!` : 'Sign Up / Log In'}</h2>
        {user ? (
          <div className="text-center">
            <button onClick={logout} className="mt-4 px-8 py-4 bg-red-700 text-white rounded-lg border-2 border-brown-800 hover:bg-red-900 transition-colors duration-200">Logout</button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border-2 border-brown-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 pixel-font"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-brown-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 pixel-font"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSignup}
                className="flex-1 px-6 py-3 bg-green-700 text-white rounded-lg border-2 border-brown-800 hover:bg-green-900 transition-colors duration-200 pixel-font"
              >
                Sign Up
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 px-6 py-3 bg-blue-700 text-white rounded-lg border-2 border-brown-800 hover:bg-blue-900 transition-colors duration-200 pixel-font"
              >
                Log In
              </button>
            </div>
            {error && <p className="text-red-500 text-center pixel-font">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;