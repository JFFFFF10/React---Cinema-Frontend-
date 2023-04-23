import React from "react";
import axios from "axios";

import "./LoginForm.css";
import Card from "../Card/Card";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
//import CreateUser from "./CreateUser";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			errorMessages: {},
		};

		this.errorMessages = {
			invalidUsername: "Invalid username",
			invalidPassword: "Invalid password",
			noUsername: "Username is required",
			noPassword: "Password is required",
			wrongAcc: "Your username/ password is wrong",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateForm() {
		const { username, password } = this.state;
		const errors = {};

		if (!username) {
			errors.username = this.errorMessages.noUsername;
		}

		if (!password) {
			errors.password = this.errorMessages.noPassword;
		}

		this.setState({ errorMessages: errors });
		return Object.keys(errors).length === 0;
	}

	async handleSubmit(e) {
		e.preventDefault();

		try {
			const { username, password } = this.state;
			const { setIsLoggedIn } = this.props;

			if (!this.validateForm()) {
				return;
			}

			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/login/",
				{
					username: username,
					password: password,
				}
			);

			if (response.status === 200) {
				// Login successful
				this.setState({ errorMessages: {} });
				console.log(response.data.token);
				localStorage.setItem("token", response.data.token); // Save token to local storage
				setIsLoggedIn(true);
			} else {
				// Login failed
				this.setState({
					errorMessages: {
						password: this.errorMessages.invalidPassword,
					},
				});
			}
		} catch (error) {
			// Login failed
			this.setState({
				errorMessages: {
					username: this.errorMessages.wrongAcc,
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
		const { username, password } = this.state;
		const { onSwitchForm } = this.props;

		return (
			<Card>
				<h1 className="title">User Login</h1>

				<form onSubmit={this.handleSubmit}>
					<div className="inputs_container">
						<div className="input_icon_container">
							<PersonIcon className="icon" />
							<input
								type="text"
								placeholder="Insert your username here"
								value={username}
								onChange={(e) => this.setState({ username: e.target.value })}
							/>
						</div>
						{this.renderErrorMsg("username")}
						{this.renderErrorMsg("noUsername")}

						<div className="input_icon_container">
							<LockIcon className="icon" />
							<input
								type="password"
								placeholder="Insert your password here"
								value={password}
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
						</div>
						{this.renderErrorMsg("password")}
						{this.renderErrorMsg("noPassword")}
					</div>

					<button type="submit" className="login_button">
						Log In
					</button>
					<div className="link_container">
						<span className="small">Not a Member?</span>
					</div>
					<button
						type="button"
						className="register_button"
						onClick={onSwitchForm}
					>
						Create User Account
					</button>
				</form>
			</Card>
		);
	}
}

export default LoginForm;
