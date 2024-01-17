import React from "react";
import "./signup.css"; // Import your component-specific CSS file
// import backgroundImage from './backgroundImage.jpg';
import { Link } from "react-router-dom";
// import svg from "../pages"
function Signin() {
  return (
    <div className="container mx-auto max-w-lg ">
      
      <div className="form-container text-left w-full">
        <h2 className="text-5xl p-6 text-gray-900 text-center">Signup</h2>
        
        <form>

          <label>Full Name:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Full Name"
            className="w-50 p-2 "
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="w-50 p-2 "
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-50 p-2 "
          />

          <button type="submit" className="bg-blue-700 rounded-3xl hover:bg-blue-900 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-5">
            Sign Up
          </button>

        </form>
        <p className="p-5">
          Already have an account?{" "}
          <Link to="/sign-in" className="pl-2 text-blue-200 hover:text-slate-100">
          {" "}
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
export default Signin;
