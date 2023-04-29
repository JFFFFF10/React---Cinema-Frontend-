import React from "react";
import axios from "axios";

import "./CreateUser.css";
import Card from "../Card/Card";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
//import Login from "./LoginForm";

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
			noConfirmPassword: "Confirm password is required",
			noEmail: "Email is required",
			passwordMismatch: "Passwords do not match",
			usernameExists: "Username already exists",
			invalidFullname:
				"Fullname cannot be empty and must not contain numbers or special characters",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateForm() {
		const { username, password, confirmPassword, fullname, email } = this.state;
		const errors = {};

		if (
			!fullname ||
			fullname.match(/[0-9~`!@#$%^&*()_+={}[\]|\\:;"'<,>.?/-]/)
		) {
			errors.fullname = this.errorMessages.invalidFullname;
		}

		if (!email) {
			errors.email = this.errorMessages.noEmail;
		}

		if (!username) {
			errors.username = this.errorMessages.noUsername;
		}

		if (!password) {
			errors.password = this.errorMessages.noPassword;
		} else if (
			!password ||
			!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
		) {
			errors.password = this.errorMessages.invalidPassword;
		}

		if (!confirmPassword) {
			errors.confirmPassword = this.errorMessages.noConfirmPassword;
		}

		if (password !== confirmPassword) {
			errors.confirmPassword = this.errorMessages.passwordMismatch;
		}

		this.setState({ errorMessages: errors });
		return Object.keys(errors).length === 0;
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
				console.log("Account ngon");
				localStorage.setItem("token", response1.data.token); // Save token to local storage

				const response2 = await axios.post(
					"https://csit-314-cinema-booking-system.vercel.app/createProfile/",
					{
						username: username,
						name: fullname,
						date_of_birth: dob,
					}
				);

				if (response2.status === 201) {
					// Profile created successfully
					this.setState({ errorMessages: {} });
					localStorage.setItem("token", response2.data.token); // Save token to local storage
					console.log("Profile ngon");
				} else {
					// Profile creation failed
					this.setState({
						errorMessages: {
							username: this.errorMessages.usernameExists,
						},
					});
				}
			} else {
				// Account creation failed
				this.setState({
					errorMessages: {
						username: this.errorMessages.usernameExists,
					},
				});
			}
		} catch (error) {
			// Account or profile creation failed
			this.setState({
				errorMessages: {
					username: this.errorMessages.usernameExists,
				},
			});
			console.error("may ngu");
		}
	}

	renderErrorMsg(name) {
		const { errorMessages } = this.state;

		if (errorMessages[name]) {
			return <div className="error_msg">{errorMessages[name]}</div>;
		}
	}

	render() {
		const { username, password, confirmPassword, fullname, dob, email } =
			this.state;
		const { onSwitchForm } = this.props;

		return (
			<Card>
				<h1 className="register--title">Create User Account</h1>

				<form onSubmit={this.handleSubmit} className="row g-3">
					<div className="register--inputs_container">
						<div
							className="register--input-container-wrapper"
							style={{ display: "flex", flexWrap: "wrap" }}
						>
							<div
								className="register--input_icon_container"
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
								className="register--input_icon_container"
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
							{this.renderErrorMsg("username")}
							{this.renderErrorMsg("noUsername")}
							{this.renderErrorMsg("fullname")}
							{this.renderErrorMsg("invalidFullname")}
						</div>

						<div
							className="register--input-container-wrapper"
							style={{ display: "flex", flexWrap: "wrap" }}
						>
							<div
								className="register--input_icon_container"
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
								className="register--input_icon_container"
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

						<div className="register--input_icon_container">
							<LockIcon className="register--icon" />
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
						</div>
						{this.renderErrorMsg("password")}
						{this.renderErrorMsg("noPassword")}

						<div className="register--input_icon_container">
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
						{this.renderErrorMsg("confirmPassword")}
						{this.renderErrorMsg("noConfirmPassword")}
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
		);
	}
}

export default CreateUserForm;
