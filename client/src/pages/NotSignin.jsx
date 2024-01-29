import React from "react";
import { Link } from "react-router-dom";
import confusion from "/confusion.png";
function NotSignin() {
  return (
    <>
      <div className="p-3 max-w-lg mx-auto content-center ">
        <img src={confusion} alt="confused" className="content-center h-60"/>
        <h5 className="text-3xl text-red-500 mb-10">Please log in to access this feature.</h5>
        <Link to="/sign-in" className="bg-gray-500 text-white px-6 py-4 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none">Login</Link>
        {/* <Link to="/sign-in" className="inline-flex hover:text-white bg-slate-600 p-4 pl-6 pr-6 hover:opacity-80 rounded-full font-semibold text-xl">Login</Link> */}
      </div>
    </>
  );
}

export default NotSignin;
