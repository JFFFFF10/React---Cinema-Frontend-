import React, { Component } from 'react';
import popupImg from './popupImg.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

import './UserAdminDelAccPopup.css';

class UserAdminDelAccPopup extends Component {
  
  handleDelete = () => {
    const { selectedUser } = this.props;

    const token = localStorage.getItem("token");
    // Make a DELETE request to the API with the user's details
    axios
      .post(`https://csit-314-cinema-booking-system.vercel.app/deleteUser/`, {
        username: selectedUser.username,
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
            text: 'User deleted successfully!',
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
      <div onClick={onClose} className="userAdminDelAcc--overlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="userAdminDelAcc--popupContainer"
        >
          <img src={popupImg} alt="/" />
          <div className="userAdminDelAcc--popupRight">
            <p className="userAdminDelAcc--closeBtn" onClick={onClose}>
              X
            </p>
            <div className="userAdminDelAcc--content">
                <label><h3>Username: {selectedUser.username}</h3></label>
                <label><h3>Email: {selectedUser.email}</h3></label>
            </div>
            <div className="userAdminDelAcc--btnContainer">
              <button className="userAdminDelAcc--btnPrimary" onClick={this.handleDelete}>
                <span className="userAdminDelAcc--bold">DELETE</span>
              </button>
              <button className="userAdminDelAcc--btnOutline" onClick={onClose}>
                <span className="userAdminDelAcc--bold">CANCEL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAdminDelAccPopup;
