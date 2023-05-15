import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

class FNBList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			movieSessions: [],
		};
	}

	handleSearchChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	handleDelete = async (id) => {
		const token = localStorage.getItem("token");

		try {
			const response = await axios.post(
				`https://csit-314-cinema-booking-system.vercel.app/delFnB/`,
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
				text: `fnb data has been deleted.`,
				showConfirmButton: false,
				timer: 3000,
			});

			if (response.status === 200) {
				console.log("Fnb delete successfully.");
			}
			window.location.reload();
			console.log(response.data);
		} catch (error) {
			throw new Error("An error occurred while deleting the fnb.");
		}
	};

	render() {
		const { fnbs, handleEdit } = this.props;
		const { searchText } = this.state;

		const filteredfnbinfo = fnbs.filter((fnb) =>
			fnb.menu.toLowerCase().includes(searchText.toLowerCase())
		);

		return (
			<div className="userManagerPage--contain-table">
				<div className="userManager--searchContainer">
					<input
						type="text"
						placeholder="Search fnb"
						className="userManager--searchBar"
						value={searchText}
						onChange={this.handleSearchChange}
					/>
				</div>
				<table className="striped-table">
					<thead>
						<tr>
							<th>No.</th>
							<th>Menu</th>
							<th>Menu Description</th>
							<th>Price</th>
							<th>Image</th>
							<th colSpan={2} className="userManagerPage--text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredfnbinfo.length > 0 ? (
							filteredfnbinfo.map((fnb, i) => (
								<tr key={i} className="userManagerPage--table">
									<td>{i + 1}</td>
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
									<td className="text-right">
										<button
											onClick={() => handleEdit(fnb)}
											className="userManagerPage--right"
										>
											Update
										</button>
									</td>
									<td className="text-left">
										<button
											onClick={() => this.handleDelete(fnb)}
											className="userManagerPage--right"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7}>No fnb</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default FNBList;
