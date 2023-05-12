import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import CinemaRoomList from "./cinemaRoomList";
import CinemaRoomAdd from "./cinemaRoomAdd";
import CinemaRoomEdit from "./cinemaRoomEdit";

class CinemaRoom extends Component {
	constructor(props) {
		super(props);

		this.state = {
			names: [],
			selectedname: null,
			isAdding: false,
			isEditing: false,
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.setIsAdding = this.setIsAdding.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.setnames = this.setnames.bind(this);
	}

	async componentDidMount() {
		try {
			const response = await axios.get(
				"https://csit-314-cinema-booking-system.vercel.app/viewAllCR/",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);
			this.setState({ names: response.data });
		} catch (error) {
			console.log(error);
		}
	}

	handleEdit(name) {
		this.setState({
			selectedname: name,
			isEditing: true,
		});
	}

	setIsAdding(isAdding) {
		this.setState({ isAdding: isAdding });
	}

	setIsEditing(isEditing) {
		this.setState({ isEditing: isEditing });
	}

	setnames(names) {
		this.setState({ names: names });
	}

	render() {
		const { names, selectedname, isAdding, isEditing } = this.state;

		return (
			<div className="userManagerPage--container">
				{/* List */}
				{!isAdding && !isEditing && (
					<>
						<Header setIsAdding={this.setIsAdding} />
						<CinemaRoomList
							names={names}
							handleEdit={this.handleEdit}
							handleDelete={this.handleDelete}
						/>
					</>
				)}
				{/* Add */}
				{isAdding && (
					<CinemaRoomAdd
						names={names}
						setnames={this.setnames}
						setIsAdding={this.setIsAdding}
					/>
				)}
				{/* Edit */}
				{isEditing && selectedname && (
					<CinemaRoomEdit
						name={selectedname} // pass the selected name instead of selectedname object
						setnames={this.setnames}
						setIsEditing={this.setIsEditing}
					/>
				)}
			</div>
		);
	}
}

export default CinemaRoom;
