import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "./CreateUser.css";
import Card from "../Card/Card";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";

class CreateUserForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullname: "",
			dob: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			errorMessages: {},
		};

		this.errorMessages = {
			invalidUsername: "Invalid username",
			invalidPassword: "At least one letter, one number and 8 characters long",
			noUsername: "Username is required",
			noPassword: "Password is required",
			noDob: "Date of Birth is required",
			noConfirmPassword: "Confirm password is required",
			noEmail: "Email is required",
			passwordMismatch: "Passwords do not match",
			usernameExists: "Username already exists",
			invalidFullname:
				"Full name cannot be empty and must not contain numbers or special characters",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateForm() {
		const { username, password, confirmPassword, fullname, email, dob } = this.state;
	
		if (
			!fullname ||
			fullname.match(/[0-9~`!@#$%^&*()_+={}[\]|\\:;"'<,>.?/-]/)
		) {
			Swal.fire('Oops!', this.errorMessages.invalidFullname, 'error');
			return false;
		}
	
		if (!username) {
			Swal.fire('Oops!', this.errorMessages.noUsername, 'error');
			return false;
		}
	
		if (!dob) {
			Swal.fire('Oops!', this.errorMessages.noDob, 'error');
			return false;
		} else {
			const inputDate = new Date(dob);
			const currentDate = new Date();
			const age = currentDate.getFullYear() - inputDate.getFullYear();
	
			if (age < 8 || age > 100) {
				Swal.fire('Oops!', 'You are either too young or too old to book tickets!', 'error');
				return false;
			}
		}
	
		if (!email) {
			Swal.fire('Oops!', this.errorMessages.noEmail, 'error');
			return false;
		}
	
		if (!password) {
			Swal.fire('Oops!', this.errorMessages.noPassword, 'error');
			return false;
		} else if (
			!password ||
			!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
		) {
			Swal.fire('Oops!', this.errorMessages.invalidPassword, 'error');
			return false;
		}
	
		if (!confirmPassword) {
			Swal.fire('Oops!', this.errorMessages.noConfirmPassword, 'error');
			return false;
		}
	
		if (password !== confirmPassword) {
			Swal.fire('Oops!', this.errorMessages.passwordMismatch, 'error');
			return false;
		}
	
		return true;
	}	

	async handleSubmit(e) {
		e.preventDefault();
	
		try {
			const { username, password, email, fullname, dob } = this.state;
	
			if (!this.validateForm()) {
				return;
			}
	
			const response1 = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/add/",
				{
					username: username,
					password: password,
					email: email,
				}
			);
	
			if (response1.status === 200) {
				// Account created successfully
				this.setState({ errorMessages: {} });
	
				const response2 = await axios.post(
					"https://csit-314-cinema-booking-system.vercel.app/createProfile/",
					{
						username: username,
						name: fullname,
						date_of_birth: dob,
					}
				);
	
				if (response2.status === 200) {
					// Profile created successfully
					this.setState({ errorMessages: {} });
					Swal.fire('Success!', 'Account & Profile created successfully', 'success').then(() => {
						window.location.href = "/login";  // Redirect to login page
					});
				} else {
					// Profile creation failed
					Swal.fire('Oops!', 'Profile creation failed', 'error');
				}
			} else {
				// Account creation failed
				Swal.fire('Oops!', 'Account creation failed', 'error');
			}
		} catch (error) {
			// Account or profile creation failed
			Swal.fire('Oops!', 'Account or profile creation failed', 'error');
		}
	}
	

	render() {
		const { username, password, confirmPassword, fullname, dob, email } =
			this.state;
		const { onSwitchForm } = this.props;

		return (
			<>
			<Link to="/" className="invisibleHomeLink"></Link>
			<Card>
				<h1 className="createUser">Create User Account</h1>

				<form onSubmit={this.handleSubmit}>
					<div className="createUser_container_input">
						<div
							className="createUser-container-wrapper"
							style={{ display: "flex", flexWrap: "wrap" }}
						>
							<div
								className="createUser_icon_container"
								style={{ flex: 1 }}
							>
								<PersonIcon className="register--icon" />
								<input
									type="text"
									placeholder="Full Name"
									value={fullname}
									onChange={(e) => this.setState({ fullname: e.target.value })}
								/>
							</div>

							<div
								className="createUser_icon_container"
								style={{ flex: 1 }}
							>
								<PersonIcon className="register--icon" />
								<input
									type="text"
									placeholder="Username"
									value={username}
									onChange={(e) => this.setState({ username: e.target.value })}
								/>
							</div>
						</div>

						<div
							className="createUser-container-wrapper"
							style={{ display: "flex", flexWrap: "wrap" }}
						>
							<div
								className="createUser_icon_container"
								style={{ flex: 1 }}
							>
								<CakeIcon className="register--icon" />
								<input
									type="date"
									name="birthdate"
									placeholder="Birthday"
									value={dob}
									onChange={(e) => this.setState({ dob: e.target.value })}
								/>
							</div>

							<div
								className="createUser_icon_container"
								style={{ flex: 1 }}
							>
								<EmailIcon className="register--icon" />
								<input
									type="email"
									name="email"
									placeholder="Email"
									value={email}
									onChange={(e) => this.setState({ email: e.target.value })}
								/>
							</div>
						</div>

						<div className="createUser_icon_container">
							<LockIcon className="register--icon" />
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
						</div>

						<div className="createUser_icon_container">
							<LockIcon className="register--icon" />
							<input
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) =>
									this.setState({ confirmPassword: e.target.value })
								}
							/>
						</div>
					</div>

					<button type="submit" className="register--register_button">
						Create Account
					</button>
					<div className="special">
						<span className="register--small">Already have an account?</span>
					</div>
					<button
						type="button"
						className="register--login_button"
						onClick={onSwitchForm}
					>
						Log In Now!
					</button>
				</form>
			</Card>
			</>
		);
	}
}

export default CreateUserForm;
