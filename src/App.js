import React from "react";
import LoggedIn from "./Components/LoggedIn/LogggedInTest";
import LoginForm from "./Components/LoginForm/LoginForm";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
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
			<>
				{this.state.isLoggedIn ? (
					<LoggedIn setIsLoggedIn={this.setIsLoggedIn} />
				) : (
					<LoginForm setIsLoggedIn={this.setIsLoggedIn} />
				)}
			</>
		);
	}
}

export default App;
