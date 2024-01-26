import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-4xl font-semibold text-center m-5">Profile</h1>
        <form action="POST">
          <img
            className="w-36 h-36 self-center rounded-full object-cover"
            src={currentUser.avatar}
            alt="Profile img"
          />
          <input type="text" 
            defaultValue={currentUser.fullName}
            id="fullName"
            placeholder="Full Name"
            className="rounded-lg p-3 bg-slate-100 m-2"
          />
          <input type="text" 
            defaultValue={currentUser.email}
            id="email"
            placeholder="Email"
            className="rounded-lg p-3 bg-slate-100 m-2"
          />
          <input type="text" 
            // defaultValue={currentUser.fullName}
            id="password"
            placeholder="Password"
            className="rounded-lg p-3 bg-slate-100 m-2"
          />
          <button
            className="uppercase bg-slate-600 text-white rounded-lg hover:opacity-85 p-3 ml-40 mr-40"
          >update</button>
        </form>

        <div className="flex justify-between m-10 text-2xl cursor-pointer ">
          <span 
            className="text-red-500 "
          >Delete Account</span>
          <span 
            className="text-red-500 "
          >Sign Out</span>
        </div>
      </div>
    </>
  );
}

export default Profile;
