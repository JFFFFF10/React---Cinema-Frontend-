import React, { useState } from 'react';
import popupImg from './popupImg.jpg';
import axios from 'axios';
import "./UAPopup.css"

const UAPopup = ({ open, onClose, user }) => {

  const [isUpdating, setIsUpdating] = useState(false);
  const token = localStorage.getItem("token");

  if (!open) return null;

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const handleCancel = () => {
    setIsUpdating(false);
  };
  
  const handleReactivate = async () => {
    if (!user) {
      console.log("User object is undefined");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://csit-314-cinema-booking-system.vercel.app/reactivateUser/",
        { username: user.username },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      alert(`User ${user.username} has been reactivated`);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to reactivate user");
    }
  };  

  const handleSuspend = async () => {

    if (!user) {
      console.log("User object is undefined");
      return;
    }

    try {
      const response = await axios.post(
        "https://csit-314-cinema-booking-system.vercel.app/suspendUser/",
        { username: user.username },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      alert(`User ${user.username} has been suspended`);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to reactivate user");
    }
  };

  return (
    <div onClick={onClose} className="userAdmin--overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="userAdmin--popupContainer"
      >
        <img src={popupImg} alt="/" />
        <div className="userAdmin--popupRight">
          <p className="userAdmin--closeBtn" onClick={() => { onClose(); setIsUpdating(false); } }>
            <b>X</b>
          </p>
          {isUpdating ? (
            <>
              <div className="userAdmin--content">
                <label><h3>Username: {user.username}</h3></label>
                <input type="text" placeholder='New Username' />
                <label><h3>Email: {user.email}</h3></label>
                <input type="email" placeholder='New Email' />
                <label><h3>Password:</h3></label>
                <input type="password" placeholder='New Password' />
                <label><h3>Confirm Password:</h3></label>
                <input type="password" placeholder='Confirm New Password' />
              </div>
              <div className='userAdmin--question'>
                <span>Update {user.username}'s account:</span>
              </div>
              <div className="userAdmin--btnContainer">
                <button className="userAdmin--btnPrimary">
                  <span className="userAdmin--bold">Save</span>
                </button>
                <button className="userAdmin--btnOutline" onClick={handleCancel}>
                  <span className="userAdmin--bold">Cancel</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="userAdmin--content">
                <p>Username:</p>
                <h3>{user.username}</h3>
                <p>Email:</p>
                <h3>{user.email}</h3>
                <p>Role:</p>
                <h3>{user.role}</h3>
              </div>
              {user.is_active ? (
                <>
                  <div className='userAdmin--question'>
                    <span>Choose your actions for {user.username}'s account:</span>
                  </div>
                  <div className="userAdmin--btnContainer">
                    <button className="userAdmin--btnPrimary" onClick={handleUpdate}>
                      <span className="userAdmin--bold">Update</span>
                    </button>
                    <button className="userAdmin--btnOutline" onClick={() => { onClose(); handleSuspend(); }}>
                      <span className="userAdmin--bold">Suspend</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='userAdmin--question'>
                    <span>Choose your actions for {user.username}'s account:</span>
                  </div>
                  <div className="userAdmin--btnContainer">
                    <button className="userAdmin--btnPrimary" onClick={handleUpdate}>
                      <span className="userAdmin--bold">Update</span>
                    </button>
                    <button className="userAdmin--btnOutline" onClick={() => { onClose(); handleReactivate(); }}>
                      <span className="userAdmin--bold">Reactivate</span>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UAPopup;
