import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import MovieSessionList from "./movieSessionList";
import MovieSessionAdd from "./movieSessionAdd";
import MovieSessionEdit from "./movieSessionEdit";
import "./userManagerPage.css";

class MovieSessionInfoPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sessions: [],
			selectedsession: null,
			isAdding: false,
			isEditing: false,
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.setIsAdding = this.setIsAdding.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.setsessions = this.setsessions.bind(this);
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
			this.setState({ sessions: response.data });
		} catch (error) {
			console.log(error);
		}
	}

	handleEdit(session) {
		this.setState({
			selectedsession: session,
			isEditing: true,
		});
	}

	setIsAdding(isAdding) {
		this.setState({ isAdding });
	}

	setIsEditing(isEditing) {
		this.setState({ isEditing });
	}

	setsessions(sessions) {
		this.setState({ sessions });
	}

	render() {
		const { sessions, selectedsession, isAdding, isEditing } = this.state;

		return (
			<div className="userManagerPage--container">
				{/* List */}
				{!isAdding && !isEditing && (
					<>
						<Header setIsAdding={this.setIsAdding} />
						<MovieSessionList
							sessions={sessions}
							handleEdit={this.handleEdit}
							handleDelete={this.handleDelete}
						/>
					</>
				)}
				{/* Add */}
				{isAdding && (
					<MovieSessionAdd
						sessions={sessions}
						setsessions={this.setsessions}
						setIsAdding={this.setIsAdding}
					/>
				)}
				{/* Edit */}
				{isEditing && selectedsession && (
					<MovieSessionEdit
						sessions={sessions}
						selectedsession={selectedsession}
						setsessions={this.setsessions}
						setIsEditing={this.setIsEditing}
					/>
				)}
			</div>
		);
	}
}
export default MovieSessionInfoPage;
