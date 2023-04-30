import React from "react";
import LoggedIn from "../LoggedIn/LoggedIn";
import AuthPage from "./AuthPage";
import "./LoginPage.css";

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			token: null,
		};
		this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
	}

	setIsLoggedIn(value) {
		this.setState({
			isLoggedIn: value,
		});
	}

	render() {
		return (
			<div className="loginPage">
				{this.state.isLoggedIn ? (
					<LoggedIn
						setIsLoggedIn={this.setIsLoggedIn}
						token={this.state.token}
					/>
				) : (
					<AuthPage
						setIsLoggedIn={this.setIsLoggedIn}
						token={this.state.token}
					/>
				)}
			</div>
		);
	}
}

export default LoginPage;
