import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import "./BuyFnbPage.css";

function BuyFnbPageWrapper() {
	let { menu_id } = useParams();
	return <BuyFnbPage menu_id={menu_id} />;
}

class BuyFnbPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOption: null,
			isLoading: true,
		};
	}

	componentDidMount() {
		this.getMenuOption();
	}

	getMenuOption() {
		const { menu_id } = this.props;
		axios
			.post("https://csit-314-cinema-booking-system.vercel.app/getFnBItem/", {
				id: menu_id,
			})
			.then((response) => {
				this.setState({ menuOption: response.data, isLoading: false });
			})
			.catch((error) => {
				console.error(
					"There was an error retrieving the food and beverage option:",
					error
				);
				console.log(menu_id);
				Swal.fire(
					"Error",
					"There was an error retrieving the food and beverage option",
					"error"
				);
			});
	}

	handleBuyNowClick() {
		Swal.fire({
			title: "Confirmation",
			text: "Are you sure you want to buy this?",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "No",
			customClass: {
				confirmButton: "swal-confirm-button",
				cancelButton: "swal-cancel-button",
			},
		}).then((result) => {
			if (result.isConfirmed) {
				const token = localStorage.getItem("token");
				const { menu_id } = this.props;
				axios
					.post(
						"https://csit-314-cinema-booking-system.vercel.app/purchaseFnB/",
						{ menu_id: menu_id },
						{
							headers: {
								"Content-Type": "application/json",
								Authorization: `Token ${token}`,
							},
						}
					)
					.then(() => {
						// Handle success response
						Swal.fire({
							title: "Success",
							text: "Item purchased successfully!",
							icon: "success",
							customClass: {
								title: "swal-success-title",
								icon: "swal-success-icon",
								confirmButton: "swal-confirm-button",
							},
						});
					})
					.catch((error) => {
						// Handle error response
						console.error("Error purchasing item:", error);
						Swal.fire(
							"Error",
							"There was an error purchasing the item",
							"error"
						);
					});
			}
		});
	}

	render() {
		const { menuOption, isLoading } = this.state;
		if (isLoading) {
			return <p className="BuyFnbPage--loading"></p>;
		}
		return (
			<>
				<Header />
				<div className="BuyFnbPage">
					<div className="BuyFnbPage--card">
						<img
							className="BuyFnbPage--image"
							src={menuOption.menuIMG}
							alt={menuOption.menu}
						/>
						<div className="BuyFnbPage--details">
							<h2 className="BuyFnbPage--menu">{menuOption.menu}</h2>
							<p className="BuyFnbPage--description">
								{menuOption.menu_description}
							</p>
							<p className="BuyFnbPage--price">
								Price: ${menuOption.price.toFixed(2)}
							</p>
							<button
								className="BuyFnbPage--button"
								onClick={() => this.handleBuyNowClick()}
							>
								Buy Now
							</button>
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default BuyFnbPageWrapper;
