import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

class FNBList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
		};
	}

	handleSearchChange = (event) => {
		this.setState({ searchText: event.target.value });
	};

	handleDelete = async (menu) => {
		const token = localStorage.getItem("token");

		try {
			const response = await axios.post(
				`https://csit-314-cinema-booking-system.vercel.app/delFnB/`,
				{ menu: menu.menu },
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
				text: `${menu.menu} 's data has been Deleted.`,
				showConfirmButton: false,
				timer: 3000,
			});

			if (response.status === 200) {
				// fnb added successfully
				console.log("Fnb delete successfully.");
			}
			window.location.reload();
			console.log(response.data);
		} catch (error) {
			console.log(menu.menu);
			throw new Error("An error occurred while deleting the fnb.");
		}
	};

	render() {
		const { fnbinfos, handleEdit } = this.props;
		const { searchText } = this.state;

		const filteredfnbinfo = fnbinfos.filter((fnbinfo) =>
		fnbinfo.menu.toLowerCase().includes(searchText.toLowerCase())
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
							<th>Is Avaibale</th>
							<th>Image</th>
							<th colSpan={2} className="userManagerPage--text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredfnbinfo.length > 0 ? (
							filteredfnbinfo.map((fnbinfo, i) => (
								<tr key={i} className="userManagerPage--table">
									<td>{i + 1}</td>
									<td>{fnbinfo.menu}</td>
									<td>{fnbinfo.menu_description}</td>
									<td>{fnbinfo.price}</td>
									<td>{fnbinfo.is_available}</td>
									<td>{fnbinfo.menuIMG}</td>
									<td className="text-right">
										<button
											onClick={() => handleEdit(fnbinfo)}
											className="userManagerPage--right"
										>
											Update
										</button>
									</td>
									<td className="text-left">
										<button
											onClick={() => this.handleDelete(fnbinfo)}
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
