import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UserAdminAddPrfPage.css';

class UserAdminAddPrfPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            date_of_birth: '',
        };
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAdd = (event) => {
        event.preventDefault();

        const { username, name, date_of_birth } = this.state;

        // Check that all fields are not empty
        if (!username || !name || !date_of_birth) {
            Swal.fire('Error', 'Please fill in all fields.', 'error');
            return;
        }

        // Check that the name does not contain numbers or special characters
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            Swal.fire('Error', 'Name should not contain numbers or special characters.', 'error');
            return;
        }

        const dobDate = new Date(date_of_birth);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dobDate.getFullYear();

        if (age < 0 || age > 100) {
            Swal.fire('Error', 'The user must be between 0 and 100 years old.', 'error');
            return;
        }

        // Make a POST request to the API with the user's details
        axios
            .post('https://csit-314-cinema-booking-system.vercel.app/createProfile/', {
                username: username,
                name: name,
                date_of_birth: date_of_birth,
            })
            .then((response) => {
                // Handle the response from the API
                if (response.status === 200) {
                    console.log('User profile added successfully!');
                    // Optionally display a success message using SweetAlert
                    Swal.fire('Success', 'User profile added successfully!', 'success');
                    // Reset the form
                    this.setState({
                        username: '',
                        name: '',
                        date_of_birth: '',
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
        const { username, name, date_of_birth } = this.state;

        return (
            <div className="useradminAddPrf--container">
                <h1 className="useradminAddPrf--title">User Admin: Add Profile</h1>
                <form onSubmit={this.handleAdd} className="useradminAddPrf--formContainer">
                    <div className="useradminAddPrf--formGroup">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="useradminAddPrf--formGroup">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="useradminAddPrf--formGroup">
                        <label htmlFor="date_of_birth">Date of Birth:</label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={date_of_birth}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className='useradminAddPrf--buttonContainer'>
                        <button type="submit" className="useradminAddPrf--button">Add Profile</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserAdminAddPrfPage;
