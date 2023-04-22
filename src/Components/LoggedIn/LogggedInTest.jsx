import React from "react";
import "./LoggedIn.css";
import Card from "../Card/Card";
import axios from "axios";

class LoggedIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
		};
	}

	componentDidMount() {
		// Make an API request to get the user data
		axios
			.get("https://csit-314-cinema-booking-system.vercel.app/getUser/", {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				// Update the user state with the received data
				this.setState({ user: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const { setIsLoggedIn } = this.props;
		const { user } = this.state;

		return (
			<>
				<Card>
					<h1 className="subtitle">You are now logged in as {user.role}</h1>
					<button className="back_button" onClick={() => setIsLoggedIn(false)}>
						Go Back
					</button>
				</Card>
			</>
		);
	}
}

export default LoggedIn;
