import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from "react-router-dom"
import { deleteUserFailure,deleteUserStart,deleteUserSuccess } from "../redux/user/userSlice";
function Profile() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const handleDelete=async ()=>{
    try {
      dispatch(deleteUserStart())
      const res= await fetch(`http://localhost:8000/users/delete/${currentUser._id}`,{
        method:'DELETE',
      })
      const data=await res.json()
      console.log(data);
      if(data.success==false){
        dispatch(deleteUserFailure())
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure())
    }
  }
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-4xl font-semibold text-center m-5">Profile</h1>
        <form>
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
          />
          <img
            className="w-36 h-36 self-center rounded-full object-cover cursor-pointer"
            src={currentUser.avatar}
            alt="Profile img"
            onClick={() => fileRef.current.click()}
          />
          <input
            type="text"
            defaultValue={currentUser.fullName}
            id="fullName"
            placeholder="Full Name"
            className="rounded-lg p-3 bg-slate-100 m-2 opacity-85 focus:outline-none"
          />
          <input
            type="text"
            defaultValue={currentUser.email}
            id="email"
            placeholder="Email"
            disabled="true"
            className="rounded-lg p-3 bg-slate-100 m-2 opacity-85 focus:outline-none"
          />

          <div className="flex content-between">
            <input
              type="text"
              // defaultValue={currentUser.fullName}
              id="password"
              placeholder="Password"
              className="rounded-lg p-3 bg-slate-100 m-2 opacity-85 w-max"
              disabled="true"
            />
            <Link to="/change-password" className="bg-gray-500 w-64 h-12 m-2 text-center text-wrap text-white rounded-lg hover:opacity-80">
              Change Password
            </Link>
          </div>
          <button className="uppercase bg-slate-600 text-white rounded-lg hover:opacity-85 p-3 ml-40 mr-40">
            update
          </button>
        </form>

        <div className="flex justify-between m-10 text-2xl cursor-pointer ">
          <span className="text-red-500 " onClick={handleDelete}>Delete Account</span>
          <span className="text-red-500 ">Sign Out</span>
        </div>
      </div>
    </>
  );
}

export default Profile;
