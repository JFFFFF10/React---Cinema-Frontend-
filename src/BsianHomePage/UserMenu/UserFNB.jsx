import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";

class UserFNB extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profiles: [],
		};
	}

	componentDidMount() {
		const token = localStorage.getItem("token");
		axios
			.get(
				"https://csit-314-cinema-booking-system.vercel.app/viewFnBBooking/",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				}
			)
			.then((response) => {
				const profiles = response.data;
				console.log(profiles);
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	}

	render() {
		const { profiles } = this.state;

		return (
			<>
				<Header />
				<div>
					<h2 className="useradminViewPrf--title">Food and Beaverages</h2>
					<div className="useradminViewPrf--tableContainer">
						<table className="useradminViewPrf--table">
							<thead>
								<tr>
									<th className="useradminViewPrf--usernameHead">Username</th>
									<th className="useradminViewPrf--nameHead">Name</th>
									<th className="useradminViewPrf--dobHead">Date of Birth</th>
								</tr>
							</thead>
							<tbody>
								{profiles.map((profile) => (
									<tr key={profile.id}>
										<td>{profile.username}</td>
										<td>{profile.name}</td>
										<td>{profile.date_of_birth}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default UserFNB;
