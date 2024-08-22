
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSlice } from "../../pages/profile/userSlice";
import {FaSignOutAlt} from 'react-icons/fa'

const ProfilePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user.userData)

    function handleLogout() {
        dispatch(removeSlice());
        navigate('/login');
      }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl mt-12">
        <figure 
            style={{
            justifyContent: 'space-between'
            }} 
            className="px-10 pt-10">
          <img
            src={user.image}
            alt="Profile"
            className="rounded-full border-4 border-primary w-20"
          />
            <button 
            className="btn btn-neutral"
            onClick={handleLogout}
            ><FaSignOutAlt/> Log out</button>
        </figure>
        <div className="card-body">
          <h2 className="card-title">Name: <strong>{user.name}</strong></h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
