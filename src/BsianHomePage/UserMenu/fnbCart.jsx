import React, { Component } from "react";
import axios from "axios";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./UserTable.css";
import FNBCartList from "./fnbCartList";

class FNBCart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: "",
			fnbs: [],
			selectedfnb: null,
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.setIsAdding = this.setIsAdding.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.setfnbs = this.setfnbs.bind(this);
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

	handleEdit(fnbs) {
		this.setState({
			selectedfnb: fnbs,
			isEditing: true,
		});
	}

	setIsAdding(isAdding) {
		this.setState({ isAdding });
	}

	setIsEditing(isEditing) {
		this.setState({ isEditing });
	}

	setfnbs(fnbs) {
		this.setState({ fnbs });
	}

	render() {
		const { fnbs, selectedfnb, isAdding, isEditing } = this.state;

		return (
			<>
				<Header />
				<div>
					<h2 className="userFNB--title">Food and Beverages</h2>
					<div className="userFNB--tableContainer">
						{!isAdding && !isEditing && (
							<>
								<FNBCartList
									fnbs={fnbs}
									handleEdit={this.handleEdit}
									handleDelete={this.handleDelete}
								/>
							</>
						)}
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default FNBCart;
