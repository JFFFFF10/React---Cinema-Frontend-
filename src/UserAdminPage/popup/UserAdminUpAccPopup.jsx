import React, { Component } from 'react';
import popupImg from './popupImg.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

import './UserAdminUpAccPopup.css';

class UserAdminUpAccPopup extends Component {
  
  handleUpdate = () => {
    const { selectedUser } = this.props;
    const emailInputAdd = document.getElementById('email-input-add');
    const passwordInputAdd = document.getElementById('password-input-add');
    const confirmPasswordInputAdd = document.getElementById('confirm-password-input-add');
  
    // Check that all fields are not null
    if (!emailInputAdd.value && !passwordInputAdd.value && !confirmPasswordInputAdd.value) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonColor: '#ad0b0b',
        confirmButtonText: 'Understood',
        zIndex: 9999, // Set a higher z-index value
      });
      return;
    }

    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Check that the email is valid
    if (!emailInputAdd.value) {
      emailInputAdd.value = "";
    } else if (!emailRegex.test(emailInputAdd.value)) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonColor: '#ad0b0b',
        confirmButtonText: 'Understood',
        zIndex: 9999, // Set a higher z-index value
      });
      return;
    }

    // Check that the password is valid
    if (!passwordInputAdd.value) {
      passwordInputAdd.value = "";
    } else if (!passwordRegex.test(passwordInputAdd.value)) {
      Swal.fire({
        title: 'Error',
        text: 'Password must be at least 8 characters long and contain at least one letter and one number.',
        icon: 'error',
        confirmButtonColor: '#ad0b0b',
        confirmButtonText: 'Understood',
        zIndex: 9999, // Set a higher z-index value
      });
      return;
    } else if (passwordInputAdd.value !== confirmPasswordInputAdd.value) { // Check that the password and confirm password fields match
      Swal.fire({
        title: 'Error',
        text: 'Password and Confirm Password do not match.',
        icon: 'error',
        confirmButtonColor: '#ad0b0b',
        confirmButtonText: 'Understood',
        zIndex: 9999, // Set a higher z-index value
      });
      return;
    }
    
    const token = localStorage.getItem("token");
    // Make a POST request to the API with the user's details
    axios
      .post('https://csit-314-cinema-booking-system.vercel.app/updateUser/', {
        username: selectedUser.username,
        email: emailInputAdd.value,
        password: passwordInputAdd.value,
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      })
      .then((response) => {
        // Handle the response from the API
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'User updated successfully!',
            icon: 'success',
            confirmButtonColor: '#00FF00',
            confirmButtonText: 'Nice!',
            zIndex: 9999, // Set a higher z-index value
          }).then(() => {
            this.props.onClose();
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonColor: '#ad0b0b',
            confirmButtonText: 'Understood',
            zIndex: 9999, // Set a higher z-index value
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#ad0b0b',
          confirmButtonText: 'Understood',
          zIndex: 9999, // Set a higher z-index value
        });
      });
  }; 

  render() {
    const { open, onClose, selectedUser } = this.props;

    if (!open || !selectedUser) return null;

    return (
      <div onClick={onClose} className="userAdminUpAcc--overlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="userAdminUpAcc--popupContainer"
        >
          <img src={popupImg} alt="/" />
          <div className="userAdminUpAcc--popupRight">
            <p className="userAdminUpAcc--closeBtn" onClick={onClose}>
              X
            </p>
            <div className="userAdminUpAcc--content">
                <label><h3>Username: {selectedUser.username}</h3></label>
                <label><h3>Email: {selectedUser.email}</h3></label>
                <input type="email" placeholder="New Email" id="email-input-add" name="email" />
                <label>
                <h3>Password:</h3>
                </label>
                <input type="password" placeholder="New Password" id="password-input-add" name="password" />
                <label>
                <h3>Confirm Password:</h3>
                </label>
                <input
                type="password"
                placeholder="Confirm New Password"
                id="confirm-password-input-add"
                name="confirm-password"
                />
            </div>
            <div className="userAdminUpAcc--btnContainer">
              <button className="userAdminUpAcc--btnPrimary" onClick={this.handleUpdate}>
                <span className="userAdminUpAcc--bold">UPDATE</span>
              </button>
              <button className="userAdminUpAcc--btnOutline" onClick={onClose}>
                <span className="userAdminUpAcc--bold">CANCEL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAdminUpAccPopup;

