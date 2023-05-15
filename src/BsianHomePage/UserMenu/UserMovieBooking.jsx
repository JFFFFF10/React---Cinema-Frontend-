import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

class MovieBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: "",
			searchText: "",
			search: [],
			movieBookings: [],
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	async componentDidMount() {
		try {
			const response = await axios.get(
				"https://csit-314-cinema-booking-system.vercel.app/viewAllBook/",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);
			this.setState({ movieBookings: response.data });
		} catch (error) {
			console.log(error);
		}
	}

	handleSearchChange = async () => {
		const { searchQuery } = this.state;

		const requestBody = {
			keyword: searchQuery,
		};
		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/SearchBook/",
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
		const { movieBookings, search } = this.state;
		const { searchText } = this.state;

		const bookings = search.length > 0 ? search : movieBookings;

		return (
			<>
				<Header />
				<div>
					<h2 className="useradminViewPrf--title">My Movie Bookings</h2>
					<div className="useradminViewPrf--tableContainer">
						<div className="userManager--searchContainer">
							<input
								type="text"
								placeholder="Search cinema room"
								className="userManager--searchBar"
								value={searchText}
								onChange={this.handleInputChange}
							/>
							<button onClick={this.handleSearchChange}>Search</button>
						</div>
						<table className="useradminViewPrf--table">
							<thead>
								<tr>
									{/* <th className="useradminViewPrf--usernameHead">Owner</th> */}
									<th>Movie</th>
									<th>Session Date</th>
									<th>Session Time</th>
									<th>Ticket Type</th>
									<th>Seat Number</th>
								</tr>
							</thead>
							<tbody>
								{bookings.map((movieBooking) => (
									<tr key={movieBooking.booking_owner}>
										<td>{movieBooking.movie_title}</td>
										<td>{movieBooking.movie_session_date}</td>
										<td>{movieBooking.movie_session_time}</td>
										<td>{movieBooking.ticket_type}</td>
										<td>{movieBooking.seat_number}</td>
									</tr>
								))}
							</tbody>
							{bookings.length === 0 && <p>No records found.</p>}
						</table>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default MovieBooking;
