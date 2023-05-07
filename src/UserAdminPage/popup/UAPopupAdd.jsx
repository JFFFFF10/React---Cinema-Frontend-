import React from 'react';
import popupImg from './popupImg.jpg';
import axios from 'axios';
import "./UAPopupAdd.css"

const UAPopupAdd = ({ open, onClose }) => {

    const handleAdd = () => {
        const usernameInputAdd = document.getElementById("username-input-add");
        const emailInputAdd = document.getElementById("email-input-add");
        const passwordInputAdd = document.getElementById("password-input-add");
        const confirmPasswordInputAdd = document.getElementById("confirm-password-input-add");

        // Check that all fields are not null
        if (!usernameInputAdd.value || !emailInputAdd.value || !passwordInputAdd.value || !confirmPasswordInputAdd.value) {
            alert("Please fill in all fields.");
            return;
        }

        // Check that the email is valid
        const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/;
        if (!emailRegex.test(emailInputAdd.value)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check that the password is valid
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(passwordInputAdd.value)) {
            alert("Password must be at least 8 characters long and contain at least one letter and one number.");
            return;
        }

        // Check that the password and confirm password fields match
        if (passwordInputAdd.value !== confirmPasswordInputAdd.value) {
            alert("Password and Confirm Password do not match.");
            return;
        }

        // Make a POST request to the API with the user's details
        axios.post('https://csit-314-cinema-booking-system.vercel.app/add/', {
            username: usernameInputAdd.value,
            email: emailInputAdd.value,
            password: passwordInputAdd.value,
        })
        .then(response => {
            // Handle the response from the API
            if (response.status === 200) {
                console.log('User added successfully!');
                onClose();
                window.location.reload();
            } else {
                alert("Something went wrong. Please try again later.");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Something went wrong. Please try again later.");
        });
    };

    if (!open) return null;
    return (
        <div onClick={onClose} className='userAdminAdd--overlay'>
            <div
                onClick={(e) => {
                e.stopPropagation();
                }}
                className='userAdminAdd--popupContainer'
            >
                <img src={popupImg} alt='/' />
                <div className='userAdminAdd--popupRight'>
                    <p className='userAdminAdd--closeBtn' onClick={onClose}>
                        X
                    </p>
                    <div className="userAdminAdd--content">
                        <label><h3>Username:</h3></label>
                        <input type="text" placeholder='New Username' id="username-input-add" name="username"/>
                        <label><h3>Email:</h3></label>
                        <input type="email" placeholder='New Email' id="email-input-add" name="email"/>
                        <label><h3>Password:</h3></label>
                        <input type="password" placeholder='New Password' id="password-input-add" name="password"/>
                        <label><h3>Confirm Password:</h3></label>
                        <input type="password" placeholder='Confirm New Password' id="confirm-password-input-add" name="confirm-password"/>
                    </div>
                    <div className='userAdminAdd--btnContainer'>
                        <button className='userAdminAdd--btnPrimary' onClick={handleAdd}>
                            <span className='userAdminAdd--bold'>ADD</span>
                        </button>
                        <button className='userAdminAdd--btnOutline' onClick={onClose}>
                            <span className='userAdminAdd--bold'>CANCEL</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default UAPopupAdd;