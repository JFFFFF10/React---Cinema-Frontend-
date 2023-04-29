import React from "react";
import LoginForm from "./LoginForm";
import CreateUser from "./CreateUser";

class AuthPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoginForm: true,
		};
		this.onSwitchForm = this.onSwitchForm.bind(this);
	}

	onSwitchForm() {
		this.setState((prevState) => ({
			isLoginForm: !prevState.isLoginForm,
		}));
	}

	render() {
		const { isLoginForm } = this.state;
		const { setIsLoggedIn, token } = this.props;

		return (
			<>
				{isLoginForm ? (
					<LoginForm
						setIsLoggedIn={setIsLoggedIn}
						token={token}
						onSwitchForm={this.onSwitchForm}
					/>
				) : (
					<CreateUser
						setIsLoggedIn={setIsLoggedIn}
						onSwitchForm={this.onSwitchForm}
					/>
				)}
			</>
		);
	}
}

export default AuthPage;
