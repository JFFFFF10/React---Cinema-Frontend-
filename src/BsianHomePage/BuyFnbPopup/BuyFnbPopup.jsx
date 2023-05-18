import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './BuyFnbPopup.css';

class BuyFnbPopup extends Component {
  
    handleBuyNowClick = () => {
        const { selectedItem } = this.props;

        const token = localStorage.getItem("token");
        // Make a DELETE request to the API with the user's details
        axios
            .post(
                "https://csit-314-cinema-booking-system.vercel.app/purchaseFnB/",
                { menu_id: selectedItem.id },
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
                this.props.onClose();
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
    };

    render() {
        const { open, onClose, selectedItem } = this.props;
      
        if (!open || !selectedItem) return null;
      
        return (
          <div onClick={onClose} className="buyFnb--overlay">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="buyFnb--popupContainer"
            >
              <div className="buyFnb--card">
                <img
                  className="buyFnb--image"
                  src={selectedItem.menuIMG}
                  alt={selectedItem.menu}
                />
                <div className="buyFnb--details">
                  <h2 className="buyFnb--menu">{selectedItem.menu}</h2>
                  <p className="buyFnb--description">
                    {selectedItem.menu_description}
                  </p>
                  <p className="buyFnb--price">
                    Price: ${selectedItem.price.toFixed(2)}
                  </p>
                  <div className="buyFnb--buttonContainer">
                    <button
                        className="buyFnb--button buyFnb--buyButton"
                        onClick={this.handleBuyNowClick}
                    >
                        Buy Now
                    </button>
                    <button
                        className="buyFnb--button buyFnb--cancelButton"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
      
}

export default BuyFnbPopup;
