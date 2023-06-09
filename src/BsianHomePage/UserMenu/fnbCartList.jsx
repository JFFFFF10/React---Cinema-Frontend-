import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

class FNBCartDelete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
		};
	}

	handleDelete = async (fnb) => {
		const token = localStorage.getItem("token");

		try {
			const response = await axios.post(
				`https://csit-314-cinema-booking-system.vercel.app/delFnBBooking/`,
				{ id: fnb.id },
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
					text: `Your order has been deleted.`,
					showConfirmButton: false,
					timer: 3000,
				}).then(() => {
					window.location.reload();
				});
			}
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Error",
				text: "Something went wrong. Please try again later.",
				icon: "error",
				showConfirmButton: false,
				timer: 3000,
			});
		}
	};

	render() {
		const { fnbs } = this.props;
		const { searchText } = this.state;

		const filteredfnbinfo = fnbs.filter((fnb) =>
			fnb.menu.toLowerCase().includes(searchText.toLowerCase())
		);

		return (
			<div>
				<div className="userFNB--tableContainer">
					<table className="userFNB--table">
						<thead>
							<tr>
								<th>No.</th>
								<th>Menu</th>
								<th>Menu Description</th>
								<th>Price</th>
								<th>Image</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredfnbinfo.length > 0 ? (
								filteredfnbinfo.map((fnb, i) => (
									<tr key={i}>
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
										<td>
											<button onClick={() => this.handleDelete(fnb)}>
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
			</div>
		);
	}
}

export default FNBCartDelete;
