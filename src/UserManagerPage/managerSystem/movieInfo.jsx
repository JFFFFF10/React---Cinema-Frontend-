import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import Header from "./Header";
import MovieList from "./movieInfoList";
import MovieAdd from "./movieInfoAdd";
import MovieEdit from "./movieInfoEdit";

class MovieInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
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

	componentDidMount() {
		axios
			.get("https://csit-314-cinema-booking-system.vercel.app/view/")
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleEdit = (movie) => {
		if (
			window.confirm(`Are you sure you want to update ${movie.movie_title}?`)
		) {
			fetch(
				`https://csit-314-cinema-booking-system.vercel.app/updateMov/${movie.movie_title}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(movie),
				}
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					this.props.handleEdit(movie.id);
				})
				.catch((err) => console.log(err));
		}
	};

	handleDelete(movie) {
		axios
			.delete(
				`https://csit-314-cinema-booking-system.vercel.app/delMov/${movie.movie_title}`
			)
			.then((response) => {
				if (response.status === 200) {
					const { movies } = this.state;
					const filteredMovies = movies.filter(
						(movieObj) => movieObj.movie_title !== movie.movie_title
					);

					this.setState({
						movies: filteredMovies,
					});

					Swal.fire({
						icon: "success",
						title: "Deleted!",
						text: `${movie.movie_title}'s data has been deleted.`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					Swal.fire({
						icon: "error",
						title: "Error!",
						text: "An error occurred while deleting the movie data.",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch((error) => {
				console.log(error);

				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "An error occurred while deleting the movie data.",
					showConfirmButton: false,
					timer: 1500,
				});
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

export default MovieInfo;
