import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

class FNBAddPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: "",
			menu_description: "",
			price: "",
			menuIMG: "",
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

	getBase64 = (file) => {
		return new Promise((resolve) => {
			let fileInfo;
			let baseURL = "";

			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				console.log("Called", reader);
				baseURL = reader.result;
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

	handleAdd = async (e) => {
		const token = localStorage.getItem("token");

		e.preventDefault();
		const { menu, menu_description, price, menuIMG } = this.state;

		if (!menu || !menu_description || !price || !menuIMG) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		try {
			const response = await axios.post(
				"https://csit-314-cinema-booking-system.vercel.app/addFnb/",
				{
					menu: menu,
					menu_description: menu_description,
					price: price,
					menuIMG: menuIMG,
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
				text: `FnB data has been added.`,
				showConfirmButton: false,
				timer: 3000,
			});

			this.setState({
				menu: "",
				menu_description: "",
				price: "",
				menuIMG: "",
			});
			if (response.status === 200) {
				console.log("FnB added successfully.");
			}
		} catch (error) {
			console.log(error);
		}
		window.location.reload();
	};

	render() {
		const { menu, menu_description, price, menuIMG } = this.state;

		return (
			<div className="userManagerPage--small-container">
				<form onSubmit={this.handleAdd} className="userManagerPage--form">
					<h1>Add Food and Beverages</h1>
					<label htmlFor="menu">New Menu</label>
					<input
						id="menu"
						type="text"
						ref={this.textInput}
						name="menu"
						value={menu}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="menu_description">Description</label>
					<input
						id="menu_description"
						type="text"
						ref={this.textInput}
						name="menu_description"
						value={menu_description}
						onChange={this.handleInputChange}
					/>
					<label htmlFor="price">Price</label>
					<input
						id="price"
						type="text"
						ref={this.textInput}
						name="price"
						value={price}
						onChange={this.handleInputChange}
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
export default FNBAddPage;
