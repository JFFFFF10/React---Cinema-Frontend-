import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

class MovieBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			search: [],
			movieBookings: [],
		};
	}

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
		const { movieBookings } = this.state;
		const { searchText } = this.state;

		const filteredSR = movieBookings.filter(
      (booking) =>
        booking.movie_title.toLowerCase().includes(searchText.toLowerCase()) ||
        booking.ticket_type.toLowerCase().includes(searchText.toLowerCase())
    );

		return (
			<>
				<Header />
				<div>
					<h2 className="userFNB--title">My Movie Bookings</h2>
					<div className="userFNB--tableContainer">
						<div className="userManager--searchContainer">
							<input
								type="text"
								placeholder="Search cinema room"
								className="userManager--searchBar"
								value={searchText}
								onChange={this.handleChange}
							/>
						</div>
						<table className="userFNB--table">
							<thead>
								<tr>
									{/* <th className="userFNB--usernameHead">Owner</th> */}
									<th>Movie</th>
									<th>Session Date</th>
									<th>Session Time</th>
									<th>Ticket Type</th>
									<th>Seat Number</th>
								</tr>
							</thead>
							<tbody>
								{filteredSR.length > 0 ? (
									filteredSR.map((movieBooking, i) => (
										<tr key={movieBooking.booking_owner}>
											<td>{movieBooking.movie_title}</td>
											<td>{movieBooking.movie_session_date}</td>
											<td>{movieBooking.movie_session_time}</td>
											<td>{movieBooking.ticket_type}</td>
											<td>{movieBooking.seat_number}</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={7}>No records found.</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default MovieBooking;
