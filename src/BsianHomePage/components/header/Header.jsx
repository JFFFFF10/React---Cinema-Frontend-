import React, { Component } from "react";
import "./header.css";
import LogoutUser from "../../../LogPage/Logout/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Mobile: false,
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.toggleMobile = this.toggleMobile.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
	}

	handleLogoutClick = () => {
		const logout = new LogoutUser();
		logout.logoutUser();
		localStorage.removeItem("token");
	};

	toggleMenu() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	toggleMobile() {
		this.setState({ isMobile: !this.state.isMobile });
	}

	render() {
		const { isOpen, isMobile } = this.state;
		const menuItems = [
			{ label: "View FnB Booking", url: "/UserFNB" },
			{ label: "View Movie Booking", url: "/" },
		];
		const token = localStorage.getItem("token");
		return (
			<>
				<header>
					<div className="container flexSB">
						<nav className="flexSB">
							<Link to={"/"}>
								<div className="logo">
									<img src="/images/logo.png" alt="Logo" />
								</div>
							</Link>
							<ul
								className={this.state.Mobile ? "navMenu-list" : "flexSB"}
								onClick={() => this.setState({ Mobile: false })}
							>
								<li>
									<a href="/">Home</a>
								</li>
								<li>
									<a href="/MoviesPage">Movies</a>
								</li>
								<li>
									<a href="/">About</a>
								</li>
							</ul>
							<button
								className="toggle"
								onClick={() => this.setState({ Mobile: !this.state.Mobile })}
							>
								{this.state.Mobile ? (
									<i className="fa fa-times"></i>
								) : (
									<i className="fa fa-bars"></i>
								)}
							</button>
						</nav>
						{/* User menu drop down  */}
						<div className="account flexSB">
							<div className="dropdown">
								<button onClick={this.toggleMenu} className="dropdown-toggle">
									<FontAwesomeIcon icon={faUser} />
								</button>
								<div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
									{menuItems.map((item, index) => (
										<a key={index} href={item.url} className="dropdown-item">
											{item.label}
										</a>
									))}
								</div>
							</div>
							{token ? (
								<Link to="/">
									<button
										className="homepage--logInButton"
										onClick={this.handleLogoutClick}
									>
										Log Out
									</button>
								</Link>
							) : (
								<Link to="/login">
									<button className="homepage--logInButton">Log In</button>
								</Link>
							)}
						</div>
					</div>
				</header>
			</>
		);
	}
}

export default Header;
