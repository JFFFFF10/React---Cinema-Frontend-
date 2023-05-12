import React, { Component } from 'react';
import popupImg from './popupImg.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

import './UserAdminUpPrfPopup.css';

class UserAdminUpPrfPopup extends Component {
  
  handleUpdate = () => {
    const { selectedUser } = this.props;
    const nameInputAdd = document.getElementById('name-input-add');
    const dobInputAdd = document.getElementById('dob-input-add');
  
    // Check that all fields are not null
    if (!nameInputAdd.value && !dobInputAdd.value) {
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

    // Check that the name is valid
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameInputAdd.value) {
        nameInputAdd.value = "";
    } else if (!nameRegex.test(nameInputAdd.value)) {
        Swal.fire({
            title: 'Error',
            text: 'Name should only contain letters.',
            icon: 'error',
            confirmButtonColor: '#ad0b0b',
            confirmButtonText: 'Understood',
            zIndex: 9999, // Set a higher z-index value
        });
        return;
    }

    // Check that the age is between 0 and 100
    const dob = new Date(dobInputAdd.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (!dobInputAdd.value) {
        dobInputAdd.value = "";
    } else if (age < 0 || age > 100) {
        Swal.fire({
            title: 'Error',
            text: 'Age cannot be less than 0 or greater than 100.',
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
      .post('https://csit-314-cinema-booking-system.vercel.app/updateProfile/', {
        id: selectedUser.id,
        name: nameInputAdd.value,
        date_of_birth: dobInputAdd.value,
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
            text: 'User profile updated successfully!',
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
      <div onClick={onClose} className="userAdminUpPrf--overlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="userAdminUpPrf--popupContainer"
        >
          <img src={popupImg} alt="/" />
          <div className="userAdminUpPrf--popupRight">
            <p className="userAdminUpPrf--closeBtn" onClick={onClose}>
              X
            </p>
            <div className="userAdminUpPrf--content">
                <label><h3>Username: {selectedUser.username}</h3></label>
                <label><h3>Name: {selectedUser.name}</h3></label>
                <input type="text" placeholder="New Name" id="name-input-add" name="name" />
                <label><h3>DOB: {selectedUser.date_of_birth}</h3></label>
                <input type="date" placeholder="New DOB" id="dob-input-add" name="dob" />
            </div>
            <div className="userAdminUpPrf--btnContainer">
              <button className="userAdminUpPrf--btnPrimary" onClick={this.handleUpdate}>
                <span className="userAdminUpPrf--bold">UPDATE</span>
              </button>
              <button className="userAdminUpPrf--btnOutline" onClick={onClose}>
                <span className="userAdminUpPrf--bold">CANCEL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAdminUpPrfPopup;

