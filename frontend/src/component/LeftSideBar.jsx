import React, { useState } from "react";
import { CiHome, CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "./Logo";
import USER_API_END_POINT from "../utils/Constant";
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(store => store.user)

  const handleLogout = async () => {
    try {
      const response = await fetch(`${USER_API_END_POINT}/logout`, {
        method: "POST",
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Logout failed");
        return;
      }
      dispatch(setUser(null));
      toast.success(data.message);
      navigate("/login");

    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 z-20 xl:w-1/3 md:w-32 md:h-screen md:sticky md:top-0 bg-white shadow-lg p-4">

  <div className="hidden md:flex flex-row justify-center items-center text-center mb-10">

        <Logo className=" bg-red-500 " />
        <span className="hidden xl:inline bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text font-bold text-2xl hover:from-red-600 hover:to-blue-600 transition-all duration-300">
          Photogram
        </span>
      </div>

      <div className="flex flex-row justify-between md:flex-col md:space-y-4">
        <Link
          to="/"
          className="flex items-center px-4 py-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
        >
          <CiHome size="32px" />
          <h1 className="hidden xl:inline font-semibold text-lg ml-2">Home</h1>
        </Link>
        
        <div className="flex items-center px-4 py-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out">
          <IoIosNotificationsOutline size="32px" />
          <h1 className="hidden xl:inline font-semibold text-lg ml-2">Notifications</h1>
        </div>
       

        <Link
          to="/changePassword"
          className="flex items-center px-4 py-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
        >
          <RiLockPasswordLine size="32px" />
          <h1 className="hidden xl:inline font-semibold text-lg ml-2">Password</h1>
        </Link>

        <div
          className="flex items-center px-4 py-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <AiOutlineLogout size="32px" />
          <h1 className="hidden xl:inline font-semibold text-lg ml-2 cursor-pointer">Logout</h1>
        </div>

        <Link
          to="/upload"
          className="flex items-center px-4 py-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
        >
          <AiOutlineUpload size="32px" />
          <h1 className="hidden xl:inline font-semibold text-lg ml-2">Post</h1>
        </Link>
        
        <Link
          to={`/profile/${user.username}`}
          className="flex items-center px-4 py-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
        >
          <CiUser size="32px" />
          <h1 className="hidden xl:inline font-semibold text-lg ml-2">Profile</h1>
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
