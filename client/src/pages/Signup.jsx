import React from "react";
import "./signup.css"; // Import your component-specific CSS file
// import backgroundImage from './backgroundImage.jpg';
import { Link } from "react-router-dom";
function Signup() {
  return (
    <div className="container text-center">
      <div className="form-container text-left">
        <h2 className="text-4xl p-6">Signup</h2>
        <form>

          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter full Name"
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

          <button type="submit" className="p-5">
            Sign Up
          </button>

        </form>
        <p className="p-5">
          Already have an account?{" "}
          <Link to="/sign-in" className="pl-2">
          {" "}
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
export default Signup;
