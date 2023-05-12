import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

class MovieSessionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
		};
	}

	handleSearchChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	handleDelete = async (name) => {
		const token = localStorage.getItem("token");

		try {
			const response = await axios.post(
				`https://csit-314-cinema-booking-system.vercel.app/delMS/`,
				{ name: name.name },
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
				text: `${name.name} has been Deleted.`,
				showConfirmButton: false,
				timer: 3000,
			});

			if (response.status === 200) {
				console.log("Cinema room delete successfully.");
			}
			window.location.reload();
			console.log(response.data);
		} catch (error) {
			console.log(name.name);
			throw new Error("An error occurred while deleting the cinema room.");
		}
	};

	render() {
		const { names, handleEdit } = this.props;
		const { searchText } = this.state;

		

		return (
			<div className="userManagerPage--contain-table">
				<div className="userManager--searchContainer">
					<input
						type="text"
						placeholder="Search room"
						className="userManager--searchBar"
						value={searchText}
						onChange={this.handleSearchChange}
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
								<tr className="userManagerPage--table">
									
									<td>{names.id}</td>
									<td>{`Movie ${names.movie}`}</td>
									<td>{names.session_date}</td>
									<td>{`Cinema Room ${names.cinema_room}`}</td>
									<td>{names.session_time}</td>
									<td className="text-right">
										<button
											onClick={() => handleEdit(names)}
											className="userManagerPage--right"
										>
											Update
										</button>
									</td>
									<td className="text-left">
										<button
											onClick={() => this.handleDelete(names)}
											className="userManagerPage--right"
										>
											Delete
										</button>
									</td>
								</tr>
						 : (
						)
					</tbody>
				</table>
			</div>
		);
	}
}

export default MovieSessionList;
