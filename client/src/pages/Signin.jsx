import React from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
// import { useAuth0 } from "@auth0/auth0-react";

function Signin() {
  // const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({});
  const [data, setdata] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // const { error, currentUser } = useSelector((state) => state);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      dispatch(signInStart());
      const result = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const Data = await result.json();
      setdata(Data.massage + "...");
      // console.log(Data, "+++", Data.massage);
      setLoading(false);
      if (Data.success == true) {
        // seterror(true)
        Cookies.set("accessToken", Data.data.token, { expires: 10 });
        dispatch(signInSuccess(Data.data.user));
        // console.log("data", Data.data.user);
        // console.log("loading", loading);
        // console.log("error", error);
        // console.log( "currentUser",currentUser);
        // seterror(false)
        // console.log(Data.massage+"...")
        navigate("/");
      } else {
        dispatch(signInFailure(Data));
      }
    } catch (error) {
      setLoading(false);
      // seterror(true)
      dispatch(signInFailure(error));
      // console.log(error)
      // setdata(error.error)
    }
  };
// const auth0Loginn=()=>{
//   loginWithRedirect()
// } 
// const sendData=()=>{
//   console.log(user);
// }
  return (
    <div className="container mx-auto max-w-lg ">
      <div className="form-container text-left w-full">
        <h2 className="text-5xl p-6 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email or UserName:</label>
          <input
            type="email"
            name="name"
            id="name"
            placeholder="Enter your Email or UserName"
            className="w-50 p-2 opacity-95 focus:outline-none"
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
            disabled={loading}
            className="bg-blue-700 rounded-3xl hover:bg-blue-900 text-white font-bold py-3 px-4 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-5"
          >
            {loading ? "Loading..." : "Log in"}
          </button>
          <p className="text-red-800 ">{data}</p>
        </form>
        {/* <button onClick={() => {auth0Loginn;sendData}} className="bg-green-500 w-full rounded-full p-4 text-center text-white mx-auto">Login with Auth0</button> */}
        <p className="p-5 ">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="pl-2 text-blue-600 hover:text-slate-100"
          >
            {" "}
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signin;
