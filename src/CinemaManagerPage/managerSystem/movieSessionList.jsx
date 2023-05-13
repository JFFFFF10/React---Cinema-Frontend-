import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

class MovieSessionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			movieSessions: [],
		};
	}

	handleDelete = async (id) => {
		const token = localStorage.getItem("token");

		try {
			const response = await axios.post(
				`https://csit-314-cinema-booking-system.vercel.app/delMS/`,
				{ id: id.id },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				}
			);

			Swal.fire({
				icon: "success",
				title: "Deleted!",
				text: `Movie session has been Deleted.`,
				showConfirmButton: false,
				timer: 3000,
			});

			if (response.status === 200) {
				console.log("Movie session delete successfully.");
			}
			window.location.reload();
			console.log(response.data);
		} catch (error) {
			throw new Error("An error occurred while deleting the movie session.");
		}
	};

	handleChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	handleSearchChange = () => {
		axios
			.post(
				"https://csit-314-cinema-booking-system.vercel.app/searchMovieSession/",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
					data: {
						searchText: this.state.searchText,
					},
				}
			)
			.then((response) => {
				this.setState({ movieSessions: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		const { sessions, handleEdit } = this.props;
		const { searchText } = this.state;

		const filteredCR = sessions.filter((session) =>
			session.movie.toLowerCase().includes(searchText.toLowerCase())
		);

		return (
			<div className="userManagerPage--contain-table">
				<div className="userManager--searchContainer">
					<input
						type="text"
						placeholder="Search movie session"
						className="userManager--searchBar"
						value={searchText}
						onChange={this.handleChange}
					/>
				</div>
				<table className="striped-table">
					<thead>
						<tr>
							<th>No.</th>
							<th>ID</th>
							<th>Movie</th>
							<th>Session Date</th>
							<th>Cinema Room</th>
							<th>Session Time</th>
							<th colSpan={2} className="userManagerPage--text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredCR.length > 0 ? (
							filteredCR.map((session, i) => (
								<tr key={i} className="userManagerPage--table">
									<td>{i + 1}</td>
									<td>{session.id}</td>
									<td>{session.movie}</td>
									<td>{session.session_date}</td>
									<td>{session.cinema_room}</td>
									<td>{session.session_time}</td>
									<td classsession="text-right">
										<button
											onClick={() => handleEdit(session)}
											className="userManagerPage--right"
										>
											Update
										</button>
									</td>
									<td classsession="text-left">
										<button
											onClick={() => this.handleDelete(session)}
											className="userManagerPage--right"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7}>No movie session</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default MovieSessionList;
