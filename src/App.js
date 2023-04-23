import React from "react";
import LoggedIn from "./Components/LoggedIn/LogggedInTest";
import LoginForm from "./Components/LoginForm/LoginForm";
import AuthPage from "./Components/LoginForm/AuthPage";
class App extends React.Component {
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
		  <>
			{this.state.isLoggedIn ? (
			  <LoggedIn setIsLoggedIn={this.setIsLoggedIn} token={this.state.token} />
			) : (
			  <AuthPage setIsLoggedIn={this.setIsLoggedIn} token={this.state.token} />
			)}
		  </>
		);
	  }
	  
}

export default App;
