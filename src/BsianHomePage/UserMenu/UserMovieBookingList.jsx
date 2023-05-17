import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

class MovieBookingList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			search: [],
		};
	}

	handleDelete = async (bookings) => {
		const token = localStorage.getItem("token");

		try {
			const response = await axios.post(
				`https://csit-314-cinema-booking-system.vercel.app/delBook/`,
				{ id: bookings.id },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				}
			);

			if (response.status === 200) {
				console.log("Fnb delete successfully.");
				Swal.fire({
					icon: "success",
					title: "Deleted!",
					text: `Your booking has been deleted.`,
					showConfirmButton: false,
					timer: 3000,
				}).then(() => {
					window.location.reload();
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	render() {
		const { movieBookings } = this.props;
		const { searchText } = this.state;

		const filteredSR = movieBookings.filter(
			(booking) =>
				booking.movie_title.toLowerCase().includes(searchText.toLowerCase()) ||
				booking.ticket_type.toLowerCase().includes(searchText.toLowerCase())
		);

		return (
			<>
				<div>
					<div className="userFNB--tableContainer">
						<div className="userManager--searchContainer">
							<input
								type="text"
								placeholder="Search movie booking"
								className="userManager--searchBar"
								value={searchText}
								onChange={this.handleChange}
							/>
						</div>
						<table className="userFNB--table">
							<thead>
								<tr>
									<th>No.</th>
									<th>Movie</th>
									<th>Session Date</th>
									<th>Session Time</th>
									<th>Ticket Type</th>
									<th>Seat Number</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{filteredSR.length > 0 ? (
									filteredSR.map((movieBooking, i) => (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{movieBooking.movie_title}</td>
											<td>{movieBooking.movie_session_date}</td>
											<td>{movieBooking.movie_session_time}</td>
											<td>{movieBooking.ticket_type}</td>
											<td>{movieBooking.seat_number}</td>
											<td>
											<button onClick={() => this.handleDelete(movieBooking)}>
												Delete
											</button>
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
					</div>
				</div>
			</>
		);
	}
}

export default MovieBookingList;
