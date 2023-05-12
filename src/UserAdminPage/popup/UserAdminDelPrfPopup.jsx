import React, { Component } from 'react';
import popupImg from './popupImg.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

import './UserAdminDelPrfPopup.css';

class UserAdminDelPrfPopup extends Component {
  
    handleDelete = () => {
        const { selectedUser } = this.props;
    
        const token = localStorage.getItem("token");
        // Make a DELETE request to the API with the user's profiles
        axios
          .post(`https://csit-314-cinema-booking-system.vercel.app/deleteProfile/`, {
            id: selectedUser.id,
          }, {
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
                text: 'Profile deleted successfully!',
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
              console.log(selectedUser.id);
            }
          })
          .catch((error) => {
            console.error(error);
            console.log(selectedUser.id);
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
        <div onClick={onClose} className="userAdminDelPrf--overlay">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="userAdminDelPrf--popupContainer"
            >
            <img src={popupImg} alt="/" />
            <div className="userAdminDelPrf--popupRight">
                <p className="userAdminDelPrf--closeBtn" onClick={onClose}>
                X
                </p>
                <div className="userAdminDelPrf--content">
                    <label><h3>Username: {selectedUser.username}</h3></label>
                    <label><h3>Name: {selectedUser.name}</h3></label>
                    <label><h3>Date of Birth: {selectedUser.date_of_birth}</h3></label>
                </div>
                <div className="userAdminDelPrf--btnContainer">
                <button className="userAdminDelPrf--btnPrimary" onClick={this.handleDelete}>
                    <span className="userAdminDelPrf--bold">DELETE</span>
                </button>
                <button className="userAdminDelPrf--btnOutline" onClick={onClose}>
                    <span className="userAdminDelPrf--bold">CANCEL</span>
                </button>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default UserAdminDelPrfPopup;
