import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UserAdminAddAccPage.css';

class UserAdminAddAccPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        };
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAdd = (event) => {
        event.preventDefault();

        const { username, email, password, confirmPassword } = this.state;

        // Check that all fields are not empty
        if (!username || !email || !password || !confirmPassword) {
            Swal.fire('Error', 'Please fill in all fields.', 'error');
            return;
        }

        // Check that the email is valid
        const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire('Error', 'Please enter a valid email address.', 'error');
            return;
        }

        // Check that the password is valid
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
        Swal.fire(
            'Error',
            'Password must be at least 8 characters long and contain at least one letter and one number.',
            'error'
        );
        return;
        }

        // Check that the password and confirm password fields match
        if (password !== confirmPassword) {
        Swal.fire('Error', 'Password and Confirm Password do not match.', 'error');
        return;
        }

        // Make a POST request to the API with the user's details
        axios
        .post('https://csit-314-cinema-booking-system.vercel.app/add/', {
            username: username,
            email: email,
            password: password,
        })
        .then((response) => {
            // Handle the response from the API
            if (response.status === 200) {
            console.log('User added successfully!');
            // Optionally display a success message using SweetAlert
            Swal.fire('Success', 'User added successfully!', 'success');
            // Reset the form
            this.setState({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            } else {
            Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
        });
    };

    render() {
        const { username, email, password, confirmPassword } = this.state;

        return (
        <div className="useradminAddAcc--container">
            <h1 className="useradminAddAcc--title">User Admin: Add Account</h1>
            <form onSubmit={this.handleAdd} className="useradminAddAcc--formContainer">
                <div className="useradminAddAcc--formGroup">
                    <label htmlFor="username">Username:</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={this.handleInputChange}
                    />
                </div>
                <div className="useradminAddAcc--formGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="useradminAddAcc--formGroup">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={this.handleInputChange}
                    />
                    </div>
                <div className="useradminAddAcc--formGroup">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className='useradminAddAcc--buttonContainer'>
                    <button type="submit" className="useradminAddAcc--button">Add Account</button>
                </div>
            </form>
        </div>
        );
    }
}
              
export default UserAdminAddAccPage;
