import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class CinemaRoomEdit extends Component {
	constructor(props) {
		super(props);

		const selectedmovie = this.props.selectedmovie;

		this.state = {
			name: selectedmovie ? selectedmovie.name : "",
			capacity: selectedmovie ? selectedmovie.capacity : "",
		};
	}

	handleUpdate = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const { setIsEditing } = this.props;
		setIsEditing(false);

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/updateMov/",
				{
					name: this.state.name,
					capacity: this.state.capacity,
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
				title: "Updated!",
				text: `${this.state.name} data has been updated.`,
				showConfirmButton: false,
				timer: 3000,
			});
			window.location.reload();
			console.log(response.data);
		} catch (error) {
			console.log(token);
		}
	};

	render() {
		const { name, capacity } = this.state;

		const { setIsEditing } = this.props;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleUpdate} className="userManagerPage--form">
					<h1>Update Cinema Room</h1>
					{/* <label htmlFor="name">Cinema Room</label>
					<input
						id="name"
						type="text"
						name="name"
						value={name}
						onChange={(event) =>
							this.setState({ name: event.target.value })
						}
						disabled
					/> */}
					<label htmlFor="capacity">Capacity</label>
					<input
						id="capacity"
						type="text"
						name="capacity"
						value={capacity}
						onChange={(event) =>
							this.setState({ capacity: event.target.value })
						}
					/>
					<div style={{ marginTop: "30px" }}>
						<input
							className="userManagerPage--left"
							type="submit"
							value="Update"
						/>
						<input
							style={{ marginLeft: "12px" }}
							className="userManagerPage--right"
							type="button"
							value="Cancel"
							onClick={() => setIsEditing(false)}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default CinemaRoomEdit;
