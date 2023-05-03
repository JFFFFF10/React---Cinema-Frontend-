import React, { Component } from "react";
import Swal from "sweetalert2";

class MovieEdit extends Component {
	constructor(props) {
		super(props);

		const selectedmovie = this.props.selectedmovie;

		this.state = {
			id: selectedmovie.id,
			movie_title: selectedmovie.movie_title,
			genre: selectedmovie.genre,
			duration: selectedmovie.duration,
			release_date: selectedmovie.release_date,
			cast: selectedmovie.cast,
		};
	}

	handleUpcast = (e) => {
		e.preventDefault();

		const { movies, setmovies, setIsEditing } = this.props;
		const { id, movie_title, genre, duration, release_date, cast } = this.state;

		if (!movie_title || !genre || !duration || !release_date || !cast) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		const movie = {
			id,
			movie_title,
			genre,
			duration,
			release_date,
			cast,
		};

		for (let i = 0; i < movies.length; i++) {
			if (movies[i].id === id) {
				movies.splice(i, 1, movie);
				break;
			}
		}

		setmovies(movies);
		setIsEditing(false);

		Swal.fire({
			icon: "success",
			title: "Updated!",
			text: `${movie.movie_title} ${movie.genre}'s data has been updated.`,
			showConfirmButton: false,
			timer: 1500,
		});
	};

	render() {
		const { movie_title, genre, duration, release_date, cast } = this.state;

		const { setIsEditing } = this.props;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleUpcast} className="userManagerPage--form">
					<h1>Edit movie</h1>
					<label htmlFor="movie_title">Movie</label>
					<input
						id="movie_title"
						type="text"
						name="movie_title"
						value={movie_title}
						onChange={(e) => this.setState({ movie_title: e.target.value })}
					/>
					<label htmlFor="genre">Genre</label>
					<input
						id="genre"
						type="text"
						name="genre"
						value={genre}
						onChange={(e) => this.setState({ genre: e.target.value })}
					/>
					<label htmlFor="duration">Duration</label>
					<input
						id="duration"
						type="time"
						name="duration"
						value={duration}
						onChange={(e) => this.setState({ duration: e.target.value })}
					/>
					<label htmlFor="release_date">Release Date</label>
					<input
						id="release_date"
						type="date"
						name="release_date"
						value={release_date}
						onChange={(e) => this.setState({ release_date: e.target.value })}
					/>
					<label htmlFor="cast">Cast</label>
					<input
						id="cast"
						type="text"
						name="cast"
						value={cast}
						onChange={(e) => this.setState({ cast: e.target.value })}
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

export default MovieEdit;
