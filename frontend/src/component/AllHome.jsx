import React,{useEffect} from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUsers';

const Home = () => {
    const {user,otherUsers} = useSelector(store => store.user)
  const navigate = useNavigate();
  // console.log(user)
useEffect(()=>{
    if (!user) { 
      navigate("/login");
    }
  },[]);

  useOtherUsers(user?.username)

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-around mx-auto">
   
    <LeftSideBar />
    <Outlet />
   <RightSideBar otherUsers={otherUsers}/>
  
    </div>
  )
}

export default Home