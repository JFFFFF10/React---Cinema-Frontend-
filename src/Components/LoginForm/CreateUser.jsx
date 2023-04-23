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
			invalidPassword: "Invalid password",
			noUsername: "Username is required",
			noPassword: "Password is required",
			noConfirmPassword: "Confirm password is required",
			passwordMismatch: "Passwords do not match",
			usernameExists: "Username already exists",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateForm() {
		const { username, password, confirmPassword } = this.state;
		const errors = {};

		if (!username) {
			errors.username = this.errorMessages.noUsername;
		}

		if (!password) {
			errors.password = this.errorMessages.noPassword;
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
			const { username, password, email } = this.state;
			//const { setIsLoggedIn } = this.props;

			if (!this.validateForm()) {
				return;
			}

			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/add/",
				{
					username: username,
					password: password,
					email: email,
				}
			);

			if (response.status === 200) {
				// Account created successfully
				this.setState({ errorMessages: {} });
				console.log("ngon");
				localStorage.setItem("token", response.data.token); // Save token to local storage
				//setIsLoggedIn(true);
			} else {
				// Account creation failed
				this.setState({
					errorMessages: {
						username: this.errorMessages.usernameExists,
					},
				});
			}
		} catch (error) {
			// Account creation failed
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

				<form onSubmit={this.handleSubmit} class="row g-3">
					<div className="register--inputs_container">
						<div
							className="register--input-container-wrapper"
							style={{ display: "flex", flexWrap: "wrap" }}
						>
							<div className="register--input_icon_container" style={{ flex: 1 }}>
								<PersonIcon className="register--icon" />
								<input
									type="text"
									placeholder="Full Name"
									value={fullname}
									onChange={(e) => this.setState({ fullname: e.target.value })}
								/>
							</div>

							<div className="register--input_icon_container" style={{ flex: 1 }}>
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
						</div>

						<div
							className="register--input-container-wrapper"
							style={{ display: "flex", flexWrap: "wrap" }}
						>
							<div className="register--input_icon_container" style={{ flex: 1 }}>
								<CakeIcon className="register--icon" />
								<input
									type="date"
									name="birthdate"
									placeholder="Birthday"
									value={dob}
									onChange={(e) => this.setState({ dob: e.target.value })}
								/>
							</div>

							<div className="register--input_icon_container" style={{ flex: 1 }}>
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
