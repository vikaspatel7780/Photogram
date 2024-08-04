import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import USER_API_END_POINT from "../utils/Constant";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New password and Confirm Password do not match");
      return;
    }

    try {
      const response = await fetch(`${USER_API_END_POINT}/changePassword`, {
        method: "POST",
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Ensure this is set correctly
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response:", data);
        toast.error(data.message || "Something went wrong");
        return;
      }
      toast.success(data.message || "Password changed successfully");
      navigate('/');
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="h-screen w-[100%] flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Change Current Password</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block mb-2" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              type="password" // Updated to password
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          
          <div>
            <label className="block mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              autoComplete="current-password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
