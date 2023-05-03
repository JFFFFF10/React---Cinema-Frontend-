import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class MovieAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie_title: "",
			genre: "",
			duration: "",
			release_date: "",
			cast: "",
			director: "",
			movie_description: "",
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
		this.props.setIsAdding(false);
	};

	handleAdd = async (e) => {
		const token = localStorage.getItem("token");

		e.preventDefault();
		const {
			movie_title,
			genre,
			duration,
			release_date,
			cast,
			director,
			movie_description,
		} = this.state;

		if (!movie_title || !genre || !duration || !release_date || !cast) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/addMov/",
				{
					movie_title: movie_title,
					genre: genre,
					duration: duration,
					release_date: release_date,
					cast: cast,
					director: director,
					movie_description: movie_description,
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
				director: "",
				movie_description: "",
			});
			if (response.status === 200) {
				// Movie added successfully
				console.log("Movie added successfully.");
			}
		} catch (error) {
			console.error("wtf?");
		}
	};

	render() {
		const {
			movie_title,
			genre,
			duration,
			release_date,
			cast,
			director,
			movie_description,
		} = this.state;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleAdd} className="userManagerPage--form">
					{/* <label htmlFor="id">ID</label>
					<input
						id="id"
						type="text"
						ref={this.textInput}
						name="id"
						value={id}
						onChange={this.handleInputChange}
					/> */}
					<h1>Add Movie</h1>
					<label htmlFor="movie_title">New Movie</label>
					<input
						id="movie_title"
						type="text"
						ref={this.textInput}
						name="movie_title"
						value={movie_title}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="genre">Genre</label>
					<input
						id="genre"
						type="text"
						ref={this.textInput}
						name="genre"
						value={genre}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="duration">Duration</label>
					<input
						id="duration"
						type="text"
						ref={this.textInput}
						name="duration"
						value={duration}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="release_date">Release Date</label>
					<input
						id="release_date"
						type="date"
						ref={this.textInput}
						name="release_date"
						value={release_date}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="cast">Cast</label>
					<input
						id="cast"
						type="text"
						ref={this.textInput}
						name="cast"
						value={cast}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="director">Director</label>
					<input
						id="director"
						type="text"
						ref={this.textInput}
						name="director"
						value={director}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="movie_description">Movie Description</label>
					<input
						id="movie_description"
						type="text"
						ref={this.textInput}
						name="movie_description"
						value={movie_description}
						onChange={this.handleInputChange}
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
export default MovieAdd;
