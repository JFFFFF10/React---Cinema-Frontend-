import React from 'react';
import popupImg from './popupImg.jpg';
import "./UAPopup.css"

const UAPopup = ({ open, onClose, user }) => {
    if (!open) return null;
    return (
      <div onClick={onClose} className="overlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="popupContainer"
        >
          <img src={popupImg} alt="/" />
          <div className="popupRight">
            <p className="closeBtn" onClick={onClose}>
              <b>X</b>
            </p>
            <div className="content">
              <p>Username:</p>
              <h3>{user.username}</h3>
              <p>Email:</p>
              <h3>{user.email}</h3>
              <p>Role:</p>
              <h3>{user.role}</h3>
            </div>
            <div className='question'>
              <span>Continue to <b>{user.username}</b>'s page?</span>
            </div>
            <div className="btnContainer">
              <button className="btnPrimary">
                <span className="bold">YES</span>, continue
              </button>
              <button className="btnOutline">
                <span className="bold">NO</span>, go back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};  
export default UAPopup;
