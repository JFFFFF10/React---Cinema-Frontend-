import React, { Component } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import RoomBookingList from "./roomBookingList";
import RoomBookingAdd from "./roomBookingAdd";
import RoomBookingEdit from "./roomBookingEdit";

import { cinemaRoomData } from "../data/cinemaRoomData";

class RoomBooking extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: cinemaRoomData,
			selectedmovie: null,
			isAdding: false,
			isEditing: false,
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.setIsAdding = this.setIsAdding.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.setmovies = this.setmovies.bind(this);
	}

	handleEdit(id) {
		const { movies } = this.state;
		const [movie] = movies.filter((movie) => movie.id === id);

		this.setState({
			selectedmovie: movie,
			isEditing: true,
		});
	}

	handleDelete(id) {
		const { movies } = this.state;

		Swal.fire({
			icon: "warning",
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
		}).then((result) => {
			if (result.value) {
				const [movie] = movies.filter((movie) => movie.id === id);

				Swal.fire({
					icon: "success",
					title: "Deleted!",
					text: `${movie.movie_title}'s data has been deleted.`,
					showConfirmButton: false,
					timer: 1500,
				});

				this.setState({
					movies: movies.filter((movie) => movie.id !== id),
				});
			}
		});
	}

	setIsAdding(isAdding) {
		this.setState({ isAdding });
	}

	setIsEditing(isEditing) {
		this.setState({ isEditing });
	}

	setmovies(movies) {
		this.setState({ movies });
	}

	render() {
		const { movies, selectedmovie, isAdding, isEditing } = this.state;

		return (
			<div className="userManagerPage--container">
				{/* List */}
				{!isAdding && !isEditing && (
					<>
						<Header setIsAdding={this.setIsAdding} />
						<RoomBookingList
							movies={movies}
							handleEdit={this.handleEdit}
							handleDelete={this.handleDelete}
						/>
					</>
				)}
				{/* Add */}
				{isAdding && (
					<RoomBookingAdd
						movies={movies}
						setmovies={this.setmovies}
						setIsAdding={this.setIsAdding}
					/>
				)}
				{/* Edit */}
				{isEditing && (
					<RoomBookingEdit
						movies={movies}
						selectedmovie={selectedmovie}
						setmovies={this.setmovies}
						setIsEditing={this.setIsEditing}
					/>
				)}
			</div>
		);
	}
}

export default RoomBooking;
