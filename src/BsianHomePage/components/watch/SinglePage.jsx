import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { homeData } from "../../dummyData";

import Header from "../header/Header";
import Footer from "../footer/Footer";

const SinglePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    let item = homeData.find((item) => item.id === parseInt(id));
    if (item) {
      setItem(item);
    }
  }, [id]);

  return (
    <>
      <Header />
      {item ? (
        <>
          <section className="singlePage">
            <div className="singleHeading">
              <h1>{item.name} </h1> <span> | Duration: {item.time} | </span>{" "}
              <span> HD </span>
            </div>
            <div className="container">
              <video src={item.video} controls autoPlay muted></video>
              <div className="para">
                <h3>Date : {item.date}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        "no"
      )}
      <Footer />
    </>
  );
};

export default SinglePage;
