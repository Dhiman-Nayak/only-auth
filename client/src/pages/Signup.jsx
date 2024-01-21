import React, { useState } from "react";
import "./signup.css"; // Import your component-specific CSS file
// import backgroundImage from './backgroundImage.jpg';
import { Link,useNavigate } from "react-router-dom";

function Signin() {
  const navigate=useNavigate();
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, seterror] = React.useState(null);
  const [data, setdata] = React.useState(null)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const result = await fetch("http://localhost:8000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const Data = await result.json();
      console.log( Data);
      setLoading(false)
      if(Data.success ==false){
        seterror(true)
      }
      seterror(false)
      setdata(Data.massage+"...")
      navigate("/signin")
    } catch (error) {
      setLoading(false)
      seterror(true)
    }
  };

  return (
    <div className="container mx-auto max-w-lg ">
      <div className="form-container text-left w-full">
        <h2 className="text-5xl p-6 text-gray-900 text-center">Signup</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input
            type="text"
            name="username"
            id="fullName"
            placeholder="Enter Full Name"
            className="w-50 p-2 opacity-85 focus:outline-none"
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            className="w-50 p-2 opacity-85 focus:outline-none"
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            className="w-50 p-2 opacity-85 focus:outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-700 rounded-3xl hover:bg-blue-900 text-white font-bold py-3 px-4  focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-5"
            disabled={loading}
          >
            {loading? "Loading...":"Sign up"}
          </button>
        </form>
        <p
          className="text-orange-900 mb-3 pl-6 "
        >
          {/* {error? data :""} */}
          {data}
        </p>
        <p className="p-5">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="pl-2 text-blue-200 hover:text-slate-100"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signin;
