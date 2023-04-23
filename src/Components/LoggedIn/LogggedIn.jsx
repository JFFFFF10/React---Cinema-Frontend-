import React from "react";
import "./LoggedIn.css";
import Card from "../Card/Card";
import axios from "axios";
import { logoutUser } from '../Logout/Logout'

class LoggedIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
		};
	}

	componentDidMount() {
		// Make an API request to get the user data
		console.log(localStorage.getItem("token"));
		axios
			.get("https://csit-314-cinema-booking-system.vercel.app/getUser/", {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				// Update the user state with the received data
				console.log(response.data)
				this.setState({ user: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		// const { setIsLoggedIn } = this.props;
		const { user } = this.state;

		return (
			<>
				<Card>
					<h1 className="subtitle">You are now logged in as {user.role}</h1>
					<button className="back_button" onClick={logoutUser}>
						Log Out
					</button>
				</Card>
			</>
		);
	}
}

export default LoggedIn;
