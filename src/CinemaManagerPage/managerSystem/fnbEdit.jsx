import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class FNBEdit extends Component {
	constructor(props) {
		super(props);

		const selectedfnb = this.props.selectedfnb;

		this.state = {
			id: selectedfnb ? selectedfnb.id : "",
			menu: selectedfnb ? selectedfnb.menu : "",
			menu_description: selectedfnb ? selectedfnb.menu_description : "",
			price: selectedfnb ? selectedfnb.price : "",
			is_available: selectedfnb ? selectedfnb.is_available : "",
			menuIMG: selectedfnb ? selectedfnb.menuIMG : "",
		};
	}

	handleUpdate = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const { setIsEditing } = this.props;
		setIsEditing(false);

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/updateFnB/",
				{
					id: this.state.id,
					menu: this.state.menu,
					menu_description: this.state.menu_description,
					price: this.state.price,
					is_available: this.state.is_available,
					menuIMG: this.state.menuIMG,
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
				text: `${this.state.menu} data has been updated.`,
				showConfirmButton: false,
				timer: 3000,
			});
			window.location.reload();
			console.log(response.data);
		} catch (error) {
			console.log(token);
		}
	};

	getBase64 = (file) => {
		return new Promise((resolve) => {
			let fileInfo;
			let baseURL = "";

			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				// Make a fileInfo Object
				console.log("Called", reader);
				baseURL = reader.result;
				//console.log(baseURL);
				resolve(baseURL);
			};
			console.log(fileInfo);
		});
	};

	handleFileInputChangemenuIMG = (e) => {
		console.log(e.target.files[0]);
		let { file } = this.state;
		file = e.target.files[0];
		this.getBase64(file)
			.then((result) => {
				file["base64"] = result;
				console.log("File Is", file);
				this.setState({
					menuIMG: result,
					file,
				});
			})
			.catch((err) => {
				console.log(err);
			});

		this.setState({
			file: e.target.files[0],
		});
	};

	render() {
		const { id, menu, menu_description, price, is_available, menuIMG } =
			this.state;

		const { setIsEditing } = this.props;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleUpdate} className="userManagerPage--form">
					<h1>Update FNB</h1>
					<label htmlFor="menu">Menu</label>
					<input
						id="menu"
						type="text"
						name="menu"
						value={menu}
						onChange={(event) => this.setState({ menu: event.target.value })}
					/>
					<label htmlFor="menu_description">Menu Description</label>
					<input
						id="menu_description"
						type="text"
						name="menu_description"
						value={menu_description}
						onChange={(event) =>
							this.setState({ menu_description: event.target.value })
						}
					/>
					<label htmlFor="price">Price</label>
					<input
						id="price"
						type="text"
						name="price"
						value={price}
						onChange={(event) => this.setState({ price: event.target.value })}
					/>
					<label htmlFor="menuIMG">menuIMG</label>
					<div>
						<input
							id="convertion"
							type="file"
							name="convertion"
							onChange={this.handleFileInputChangemenuIMG}
						/>
					</div>
					<textarea
						id="menuIMG"
						type="text"
						ref={this.textInput}
						name="menuIMG"
						value={menuIMG}
						rows="2"
						cols="50"
						onChange={(event) => this.setState({ menuIMG: event.target.value })}
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

export default FNBEdit;
