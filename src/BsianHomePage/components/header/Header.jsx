import React, { useState } from "react";
import "./header.css";
import LogoutUser from "../../../LogPage/Logout/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [Mobile, setMobile] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogoutClick = () => {
	const logout = new LogoutUser();
	logout.logoutUser();
	localStorage.removeItem("token");
};

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
              className={Mobile ? "navMenu-list" : "flexSB"}
              onClick={() => setMobile(false)}
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
            <button className="toggle" onClick={() => setMobile(!Mobile)}>
              {Mobile ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </nav>
          <div className="account flexSB">
            <button className="account-icons">
              <FontAwesomeIcon icon={faUser} />
            </button>
            {token ? (
			  <Link to="/">
				<button className="homepage--logInButton" onClick={handleLogoutClick}>
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
};

export default Header;
