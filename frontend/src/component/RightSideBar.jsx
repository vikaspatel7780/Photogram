import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="hidden lg:inline w-1/3 m-10 h-screen sticky top-0">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
        <CiSearch size="20px" />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        {otherUsers?.map((user) => (
          <div key={user._id} className="flex items-center justify-between my-3">
            <div className="flex">
              <div>
                <Avatar
                  src={user.avatarUrl || "https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"}
                  size="40"
                  round={true}
                />
              </div>
              <div className="ml-2">
                <h1 className="font-bold">{user.username}</h1>
                <p className="text-sm">@{user.username}</p>
              </div>
            </div>
            <div>
              <Link to={`/profile/${user.username}`}>
                <button className="px-4 py-1 bg-black text-white rounded-full">
                  Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* <Footer />? */}
    </div>
  );
};

export default RightSidebar;
