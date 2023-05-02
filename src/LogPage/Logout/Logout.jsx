import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class LogoutUser extends React.Component {
	async logoutUser() {
		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/logout/",
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Token ${localStorage.getItem("token")}`,
					},
				}
			);

			console.log(response.data.message);
			alert("Log Out Successful!");
		} catch (error) {
			console.log(error);
			console.log(localStorage.getItem("token"));
			alert("Log Out Unsuccessful! :(");
		}
	}

	render() {
		return null;
	}
}

export default LogoutUser;
