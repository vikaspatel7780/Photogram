import React, { useEffect } from 'react';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUsers';

const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]); // Add user and navigate to dependencies

  useOtherUsers(user?.username);
  
  // console.log(process.env.REACT_APP_USER_API_END_POINT);

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-around mx-auto">
      <LeftSideBar />
      <Outlet />
      <RightSideBar otherUsers={otherUsers} />
    </div>
  );
}

export default Home;
