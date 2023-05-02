import React, { Component } from "react";
import Swal from "sweetalert2";

class MovieAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie_title: "",
			genre: "",
			duration: "",
			release_date: "",
			cast: "",
		};
		this.textInput = React.createRef();
	}

	componentDidMount() {
		this.textInput.current.focus();
	}

	handleAdd = (e) => {
		e.preventDefault();
		const { movie_title, genre, duration, release_date, cast } = this.state;

		if (!movie_title || !genre || !duration || !release_date || !cast) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		const id = this.props.movies.length + 1;
		const newMovie = {
			id,
			movie_title,
			genre,
			duration,
			release_date,
			cast,
		};
		const movies = [...this.props.movies, newMovie];
		this.props.setmovies(movies);
		this.props.setIsAdding(false);

		Swal.fire({
			icon: "success",
			title: "Added!",
			text: `${movie_title} 's data has been Added.`,
			showConfirmButton: false,
			timer: 1500,
		});

		this.setState({
			movie_title: "",
			genre: "",
			duration: "",
			release_date: "",
			cast: "",
		});
	};

	render() {
		const { movie_title, genre, duration, release_date, cast } = this.state;
		const { setIsAdding } = this.props;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleAdd} className="userManagerPage--form">
					<h1>Add Movie</h1>
					<label htmlFor="movie_title">New Movie</label>
					<input
						id="movie_title"
						type="text"
						ref={this.textInput}
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
							value="Add"
						/>
						<input
							style={{ marginLeft: "12px" }}
							className="userManagerPage--right"
							type="button"
							value="Cancel"
							onClick={() => setIsAdding(false)}
						/>
					</div>
				</form>
			</div>
		);
	}
}
export default MovieAdd;
