import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // State for success message

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful:", result.user);
      setSuccess(true); // Set success state to true
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard or desired page
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(error.message);
      console.error("Google Login Error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Facebook login successful:", result.user);
      setSuccess(true); // Set success state to true
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard or desired page
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(error.message);
      console.error("Facebook Login Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true); // Set success state to true
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard or desired page
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(error.message);
      console.error("Login Error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-600 via-black to-blue-600 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/assets/futuristic-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gray-900  bg-opacity-60"></div>
      </div>
      <section className="relative z-10 max-w-md w-full p-8 sm:p-12 bg-black bg-opacity-80 rounded-xl shadow-lg backdrop-blur-md animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-8 text-white neon-text">
          Welcome to AD-2080
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-900 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-900 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="********"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 top-6 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              <svg
                className={`h-6 w-6 text-gray-300 cursor-pointer transition duration-300 ${showPassword ? "eye-open" : "eye-closed"
                  }`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showPassword ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 8c-5.25 0-9.75-3.5-11.25-8C2.25 7.5 6.75 4 12 4s9.75 3.5 11.25 8c-1.5 4.5-6 8-11.25 8z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.5c5.25 0 9.75 3.5 11.25 8-1.5 4.5-6 8-11.25 8S2.25 16.5.75 12c1.5-4.5 6-8 11.25-8zm0 0v.01M12 14a2 2 0 100-4 2 2 0 000 4zm0 0v.01"
                  />
                )}
              </svg>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mb-4">Login successful!</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>

        {/* Social login buttons */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition duration-300"
          >
            Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition duration-300"
          >
            Facebook
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
