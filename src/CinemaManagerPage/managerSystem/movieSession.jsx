import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import MovieSessionList from "./movieSessionList";
import MovieSessionAdd from "./movieSessionAdd";
import MovieSessionEdit from "./movieSessionEdit";

class MovieSession extends Component {
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
				"https://csit-314-cinema-booking-system.vercel.app/viewAllMS/",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);
			const transformedData = response.data.map((item) => {
				return {
					id: item.id,
					movie: `Movie ${item.movie}`,
					session_date: item.session_date,
					cinema_room: `Cinema Room ${item.cinema_room}`,
					session_time: item.session_time,
				};
			});
			this.setState({ names: transformedData });
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
		this.setState({ isAdding });
	}

	setIsEditing(isEditing) {
		this.setState({ isEditing });
	}

	setnames(names) {
		this.setState({ names });
	}

	render() {
		const { names, selectedname, isAdding, isEditing } = this.state;

		return (
			<div className="userManagerPage--container">
				{/* List */}
				{!isAdding && !isEditing && (
					<>
						<Header setIsAdding={this.setIsAdding} />
						<MovieSessionList
							names={names}
							handleEdit={this.handleEdit}
							handleDelete={this.handleDelete}
						/>
					</>
				)}
				{/* Add */}
				{isAdding && (
					<MovieSessionAdd
						names={names}
						setnames={this.setnames}
						setIsAdding={this.setIsAdding}
					/>
				)}
				{/* Edit */}
				{isEditing && selectedname && (
					<MovieSessionEdit
						names={names}
						selectedname={selectedname}
						setnames={this.setnames}
						setIsEditing={this.setIsEditing}
					/>
				)}
			</div>
		);
	}
}

export default MovieSession;
