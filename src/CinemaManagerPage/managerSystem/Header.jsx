import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./managerPage.css";
import "./userManagerPage.css";
import LogoutUser from "../../LogPage/Logout/Logout";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
		};
	}

	handleLogoutClick = () => {
		const logout = new LogoutUser();
		logout.logoutUser();
	};

	render() {
		const { setIsAdding } = this.props;

		return (
			<header>
				<h1>Cinema Manager System</h1>
				<Link to="/">
					<button
						className="managerLogout-button"
						onClick={this.handleLogoutClick}
					>
						Log Out
					</button>
				</Link>
				<div style={{ marginTop: "30px", marginBottom: "18px" }}>
					<button onClick={() => setIsAdding(true)} className="round-button">
						Add
					</button>
				</div>

				<div>
					<nav className="userManager-nav">
						<ul>
							<li>
								<Link to="/MovieInfo">MovieInfo</Link>
							</li>
							<li>
								<Link to="/RoomBooking">RoomBooking</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		);
	}
}

export default Header;
