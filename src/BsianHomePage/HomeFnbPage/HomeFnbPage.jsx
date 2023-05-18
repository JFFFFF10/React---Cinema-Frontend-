import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BuyFnbPopup from "../BuyFnbPopup/BuyFnbPopup";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import "./HomeFnbPage.css";

class HomeFnbPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodAndBeverageOptions: [],
      hoveredId: null,
      isLoggedIn: false,
      selectedOption: null,
      isPopupOpen: false,
    };
  }

  componentDidMount() {
    this.getFoodAndBeverageOptions();
    this.checkLoginStatus();
  }

  getFoodAndBeverageOptions() {
    axios
      .get("https://csit-314-cinema-booking-system.vercel.app/viewAllFnb/")
      .then((response) => {
        this.setState({ foodAndBeverageOptions: response.data });
      })
      .catch((error) => {
        console.error("There was an error retrieving the food and beverage options:", error);
      });
  }

  checkLoginStatus() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  handleItemClick(option) {
    if (this.state.isLoggedIn) {
      // User is logged in, open the BuyFnbPopup
      this.setState({ selectedOption: option, isPopupOpen: true });
    } else {
      // User is not logged in, show SweetAlert error message
      Swal.fire("Error", "You must log in to buy this item.", "error");
    }
  }

  handleClosePopup() {
    this.setState({ isPopupOpen: false });
  }

  render() {
    const { foodAndBeverageOptions, selectedOption, isPopupOpen } = this.state;
    return (
      <>
        <Header />
        <div className="HomeFnbPage">
          {foodAndBeverageOptions.length === 0 ? (
            <p className="HomeFnbPage--loading"></p>
          ) : (
            foodAndBeverageOptions.map((option) => (
              <div
                className="HomeFnbPage--item"
                key={option.id}
                onMouseEnter={() => this.setState({ hoveredId: option.id })}
                onMouseLeave={() => this.setState({ hoveredId: null })}
                onClick={() => this.handleItemClick(option)}
              >
                <img className="HomeFnbPage--image" src={option.menuIMG} alt={option.menu} />
                <h2 className="HomeFnbPage--menu">{option.menu}</h2>
                {this.state.hoveredId === option.id && this.state.isLoggedIn ? (
                  <button className="HomeFnbPage--button" onClick={() => this.handleItemClick(option)}>Buy Now</button>
                ) : (
                  <p className="HomeFnbPage--description">{option.menu_description}</p>
                )}
                <p className="HomeFnbPage--price">Price: ${option.price.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
        <Footer />
        {isPopupOpen && (
          <BuyFnbPopup
            selectedItem={selectedOption}
            onClose={() => this.handleClosePopup()}
			open={isPopupOpen}
          />
        )}
      </>
    );
  }
}

export default HomeFnbPage;
