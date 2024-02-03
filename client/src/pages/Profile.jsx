import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} from "../redux/user/userSlice";
import Cookies from "js-cookie";
import { Client, Storage, ID, Permission, Role } from "appwrite";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  
  const cookiess = Cookies.get();
  
  const [email, setEmail] = useState(currentUser.email);
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [avatar, setavatar] = useState(undefined);
  const [formData, setFormData] = useState({"email":email,"fullName":fullName})
  
  console.log(formData);
  useEffect(() => {
    if (avatar) {
      handleFileUpload(avatar);
    }
    // return () => {
    //   second
    // }
  }, [avatar]);

  const handleFileUpload = (pic) => {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("65ba7c592323b0740d25");

    const storage = new Storage(client);

    const promise = storage.createFile(
      "65bdda1f0177f296430e",
      ID.unique(),
      document.getElementById("uploader").files[0],
      [
        Permission.write(Role.any()), // Writers can update this document
      ]
    );

    promise.then(
      function (response) {

        console.log(response); // Success
        setFormData({ ...formData, "avatar": `https://cloud.appwrite.io/v1/storage/buckets/65bdda1f0177f296430e/files/${response.$id}/view?project=65ba7c592323b0740d25&mode=admin` });
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  const handleSignOut = async () => {
    try {
      await fetch("http://localhost:8000/api/users/signout");
      dispatch(signOut());
      Cookies.remove("accessToken");
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:8000/api/users/delete/${currentUser._id}/${cookiess.accessToken}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.success == false) {
        dispatch(deleteUserFailure());
        navigate("/errorlogin");
      } else {
        Cookies.remove("accessToken");
        navigate("/signin");
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure());
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fullName, email, avatar);
  };
  const handleChange =(e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
            onChange={(e) => setavatar(e.target.files[0])}
            id="uploader"
          />
          <img
            className="w-36 h-36 self-center rounded-full object-cover cursor-pointer"
            src={
              formData.avatar ||currentUser.avatar
            }
            alt="Profile img"
            onClick={() => fileRef.current.click()}
          />
          <input
            type="text"
            defaultValue={fullName}
            id="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="rounded-lg p-3 bg-slate-100 m-2 opacity-85 focus:outline-none"
          />
          <input
            type="text"
            defaultValue={email}
            id="email"
            placeholder="Email"
            // disabled="true"
            onChange={handleChange}
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
            <Link
              to="/change-password"
              className="bg-gray-500 w-64 h-12 m-2 text-center text-wrap text-white rounded-lg hover:opacity-80"
            >
              Change Password
            </Link>
          </div>
          <button
            className="uppercase bg-slate-600 text-white rounded-full hover:opacity-85 p-3 ml-40 mr-40"
            onClick={handleSubmit}
          >
            update
          </button>
        </form>

        <div className="flex justify-between m-10 text-2xl cursor-pointer ">
          <span className="text-red-500 " onClick={handleDelete}>
            Delete Account
          </span>
          <span className="text-red-500 " onClick={handleSignOut}>
            Sign Out
          </span>
        </div>
      </div>
    </>
  );
}

export default Profile;
