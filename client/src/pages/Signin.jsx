import React from "react";
import "./signup.css"; 
import { Link ,useNavigate} from "react-router-dom";
import {signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import {  useDispatch, useSelector } from "react-redux";
// import svg from "../pages"
function Signin() {
  const naviate =useNavigate()
  const dispatch=useDispatch()
  const [formData, setFormData] = React.useState({});
  // const [loading, setLoading] = React.useState(false);
  // const [error, seterror] = React.useState(null);
  const { loading, error,currentUser } = useSelector((state) => {
    return state
  });
  const [data, setdata] = React.useState(null)
  const handleChange=(e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();

    try {
      // setLoading(true)
      dispatch(signInStart())
      const result = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const Data = await result.json();
      setdata(Data.massage+"...")
      
      console.log("data", data);
      console.log( "currentUser",currentUser);
      // setLoading(false)
      dispatch(signInSuccess(Data))
      if(Data.success ==false){
        // seterror(true)
        dispatch(signInFailure(Data))
      }
      seterror(false)
      console.log(Data.massage+"...")
      naviate("/")
    } catch (error) {
      // setLoading(false)
      // seterror(true)
      dispatch(signInFailure(error))
      console.log(error)
      // setdata(error.error)
    }
  }

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

          <button type="submit" disabled={loading} className="bg-blue-700 rounded-3xl hover:bg-blue-900 text-white font-bold py-3 px-4 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-5">
          {loading? "Loading...":"Log in"}
          </button>
          <p className="text-red-800 ">{data}</p>
        </form>
        <p className="p-5 ">
          Don't have an account?{" "}
          <Link to="/sign-up" className="pl-2 text-blue-200 hover:text-slate-100">
          {" "}
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}
export default Signin;
