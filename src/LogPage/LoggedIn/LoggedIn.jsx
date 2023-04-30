import React from "react";
import "./LoggedIn.css";
import Card from "../Card/Card";
import axios from "axios";
import LogoutUser from "../Logout/Logout";
import { Link, Navigate } from "react-router-dom";

class LoggedIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			redirectToUserAdminPage: false, // Add new state to track if should redirect to UserAdminPage
		};
	}

	handleLogoutClick = () => {
		const logout = new LogoutUser();
		logout.logoutUser();
	};

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
				console.log(response.data);
				this.setState({ user: response.data });

				// Check if user is UserAdmin and redirect to UserAdminPage if they are
				if (response.data.role === "UserAdmin") {
					this.setState({ redirectToUserAdminPage: true });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const { user, redirectToUserAdminPage } = this.state;

		if (redirectToUserAdminPage) {
			return <Navigate to="/UserAdminPage" />;
		}

		return (
			<>
				<Card>
					<h1 className="subtitle">You are now logged in as {user.role}</h1>
					<Link to="/">
						<button className="back_button" onClick={this.handleLogoutClick}>
							Log Out
						</button>
					</Link>
				</Card>
			</>
		);
	}
}

export default LoggedIn;
