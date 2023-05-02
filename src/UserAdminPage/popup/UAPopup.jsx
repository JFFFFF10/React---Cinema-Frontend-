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

  const handleSave = async () => {
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const confirmPasswordInput = document.getElementById("confirm-password-input");
  
    // Check for empty fields
    if (!emailInput.value && !passwordInput.value && !confirmPasswordInput.value) {
      alert("Please enter new email and/or password.");
      return;
    }

    // Check for valid email format
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
      alert("Please enter a valid email address.");
      emailInput.value="";
      return;
    }

    // Check for valid password format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordInput.value && !passwordRegex.test(passwordInput.value)) {
      alert("Please enter a password that is at least 8 characters long and contains at least one letter and one number.");
      passwordInput.value = "";
      confirmPasswordInput.value = "";
      return;
    }

    // Check that password and confirm password match
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("Passwords do not match.");
      return;
    }
  
    const payload = {};
    if (emailInput.value) {
      payload.email = emailInput.value;
    }
    if (passwordInput.value) {
      payload.password = passwordInput.value;
    }
  
    try {
      if (payload.email && payload.password) {
        try {
          await axios.post('https://csit-314-cinema-booking-system.vercel.app/changeEmail/', {
            username: user.username, 
            new_email: emailInput.value,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
      
          await axios.post('https://csit-314-cinema-booking-system.vercel.app/changePW/', {
            username: user.username, 
            new_password: passwordInput.value,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
      
          console.log('Email and password updated successfully');
          alert(`User ${user.username}'s email and password has been updated`);
        } catch (error) {
          console.error('Error updating email and password:', error);
        }
      } else if (payload.email) {
        const response = await axios.post(
          "https://csit-314-cinema-booking-system.vercel.app/changeEmail/",
          { 
            username: user.username, 
            new_email: emailInput.value,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          }
        );
        console.log(response.data);
        alert(`User ${user.username}'s email has been updated`);
      } else if (payload.password) {
        const response = await axios.post(
          "https://csit-314-cinema-booking-system.vercel.app/changePW/",
          { 
            username: user.username,
            new_password: passwordInput.value, 
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          }
        );
        console.log(response.data);
        alert(`User ${user.username}'s password has been updated`);
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      console.log(user.username)
      console.log(passwordInput.value)
      alert("Failed to update user");
    }
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
      window.location.reload();
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
      window.location.reload();
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
                <label><h3>Email: {user.email}</h3></label>
                <input type="email" placeholder='New Email' id="email-input" name="email"/>
                <label><h3>Password:</h3></label>
                <input type="password" placeholder='New Password' id="password-input" name="password"/>
                <label><h3>Confirm Password:</h3></label>
                <input type="password" placeholder='Confirm New Password' id="confirm-password-input" name="confirm-password"/>
              </div>
              <div className='userAdmin--question'>
                <span>Update {user.username}'s account:</span>
              </div>
              <div className="userAdmin--btnContainer">
                <button className="userAdmin--btnPrimary" onClick={handleSave}>
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
