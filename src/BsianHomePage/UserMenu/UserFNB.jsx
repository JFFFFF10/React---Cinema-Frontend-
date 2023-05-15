import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

class UserFNB extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			search: [],
			fnbs: [],
		};
	}

	async componentDidMount() {
		try {
			const response = await axios.get(
				"https://csit-314-cinema-booking-system.vercel.app/viewFnBBooking/",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);
			this.setState({ fnbs: response.data });
		} catch (error) {
			console.log(error);
		}
	}

	handleChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	handleSearchChange = async () => {
		const { searchQuery } = this.state;

		const requestBody = {
			keyword: searchQuery,
		};
		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/searchFnBBooking/",
				requestBody,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);
			this.setState({ search: response.data });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { fnbs, search } = this.state;
		const { searchText } = this.state;

		const filteredSR = fnbs.filter((fnb) =>
			fnb.menu.toLowerCase().includes(searchText.toLowerCase())
		);

		const bookings = search.length > 0 ? search : fnbs;

		return (
			<>
				<Header />
				<div>
					<h2 className="useradminViewPrf--title">My Food and Beaverages</h2>
					<div className="useradminViewPrf--tableContainer">
						<table className="useradminViewPrf--table">
							<thead>
								<tr>
									<th className="useradminViewPrf--usernameHead">Menu</th>
									<th className="useradminViewPrf--usernameHead">Menu Description</th>
									<th className="useradminViewPrf--usernameHead">Price</th>
									<th className="useradminViewPrf--usernameHead">Image</th>
								</tr>
							</thead>
							<tbody>
								{filteredSR.length > 0 ? (
									filteredSR.map((fnb, i) => (
										<tr key={fnb.id}>
											<td>{fnb.menu}</td>
											<td>{fnb.menu_description}</td>
											<td>{fnb.price}</td>
											<td>
												<img
													src={`${fnb.menuIMG}`}
													alt="Poster image"
													width={100}
												/>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={7}>No records found.</td>
									</tr>
								)}
							</tbody>
						</table>
						{bookings.length === 0 && <p>No records found.</p>}
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default UserFNB;
