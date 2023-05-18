import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import MovieList from "./movieInfoList";
import MovieAdd from "./movieInfoAdd";
import MovieEdit from "./movieInfoEdit";

class MovieInfoPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: [],
			selectedmovie: null,
			isAdding: false,
			isEditing: false,
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.setIsAdding = this.setIsAdding.bind(this);
		this.setIsEditing = this.setIsEditing.bind(this);
		this.setmovies = this.setmovies.bind(this);
	}

	componentDidMount() {
		axios
			.get("https://csit-314-cinema-booking-system.vercel.app/viewMov/")
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleEdit(movie) {
		this.setState({
			selectedmovie: movie,
			isEditing: true,
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
						<MovieList
							movies={movies}
							handleEdit={this.handleEdit}
							handleDelete={this.handleDelete}
						/>
					</>
				)}
				{/* Add */}
				{isAdding && (
					<MovieAdd
						movies={movies}
						setmovies={this.setmovies}
						setIsAdding={this.setIsAdding}
					/>
				)}
				{/* Edit */}
				{isEditing && (
					<MovieEdit
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

export default MovieInfoPage;
