import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./UserTable.css";
import FnbCart from "./fnbCart";

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

	render() {
		const { fnbs } = this.state;
		const { searchText } = this.state;

		const filteredSR = fnbs.filter((fnb) =>
			fnb.menu.toLowerCase().includes(searchText.toLowerCase())
		);

		return (
			<>
				<Header />
				<div>
					<h2 className="userFNB--title">My Food and Beaverages</h2>
					<div className="userFNB--tableContainer">
						<table className="userFNB--table">
							<thead>
								<tr>
									<th>No.</th>
									<th>Menu</th>
									<th>Menu Description</th>
									<th>Price</th>
									<th>Image</th>
								</tr>
							</thead>
							<tbody>
								{filteredSR.length > 0 ? (
									filteredSR.map((fnb, i) => (
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

export default UserFNB;
