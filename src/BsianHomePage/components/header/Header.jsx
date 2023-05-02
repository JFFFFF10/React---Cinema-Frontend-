import React, { useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
	const [Mobile, setMobile] = useState(false);
	return (
		<>
			<header>
				<div className="container flexSB">
					<nav className="flexSB">
						<div className="logo">
							<img src="./images/logo.png" alt="" />
						</div>
						{/*<ul className='flexSB'>*/}
						<ul
							className={Mobile ? "navMenu-list" : "flexSB"}
							onClick={() => setMobile(false)}
						>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/">About</a>
							</li>
						</ul>
						<button className="toggle" onClick={() => setMobile(!Mobile)}>
							{Mobile ? (
								<i className="fa fa-times"></i>
							) : (
								<i className="fa fa-bars"></i>
							)}
						</button>
					</nav>
					<div className="account flexSB">
						<button className="account-icons"><FontAwesomeIcon icon={faSearch} /></button>
						<button className="account-icons"><FontAwesomeIcon icon={faUser} /></button>
						<Link to="/login">
							<button className="homepage--logInButton">Log In</button>
						</Link>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
