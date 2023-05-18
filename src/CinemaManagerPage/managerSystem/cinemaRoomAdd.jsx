import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class RoomBookingAddPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			capacity: "",
		};
		this.textInput = React.createRef();
	}

	componentDidMount() {
		this.textInput.current.focus();
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleCancel = () => {
		window.location.reload();
		this.props.setIsAdding(false);
	};

	handleAdd = async (e) => {
		const token = localStorage.getItem("token");

		e.preventDefault();
		const { name, capacity } = this.state;

		if (!name || !capacity) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/addCR/",
				{
					name: name,
					capacity: capacity,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				}
			);

			Swal.fire({
				icon: "success",
				title: "Added!",
				text: `Cinema room has been added.`,
				showConfirmButton: false,
				timer: 3000,
			});

			this.setState({
				name: "",
				capacity: "",
			});
			if (response.status === 200) {
				console.log("Cinema room added successfully.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { name, capacity } = this.state;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleAdd} className="userManagerPage--form">
					<h1>Add Cinema Room</h1>
					<label htmlFor="name">Cinema Room</label>
					<input
						id="name"
						type="text"
						ref={this.textInput}
						name="name"
						value={name}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="capacity">capacity</label>
					<input
						id="capacity"
						type="text"
						name="capacity"
						value={capacity}
						onChange={(e) => this.setState({ capacity: e.target.value })}
					/>
					<div style={{ marginTop: "30px" }}>
						<input
							className="userManagerPage--left"
							type="submit"
							value="Add"
						/>
						<input
							style={{ marginLeft: "12px" }}
							className="userManagerPage--right"
							type="button"
							value="Cancel"
							onClick={this.handleCancel}
						/>
					</div>
				</form>
			</div>
		);
	}
}
export default RoomBookingAddPage;
