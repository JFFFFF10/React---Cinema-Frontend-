import React, { useState } from "react"
import Homes from "../Components/homes/Homes"
import Upcoming from "../Components/upcoming/Upcoming"
import { latest, recommended, upcome } from "../dummyData"
import Header from "../Components/header/Header";
import Footer from "../Components/footer/Footer";
import "./HomePage.css";

const HomePage = () => {
  const [items, setItems] = useState(upcome)
  const [item, setItem] = useState(latest)
  const [rec, setRec] = useState(recommended)
  return (
    <>
      <Header />
      <Homes />
      
      <Upcoming items={items} title='Upcoming Movies' />
      <Upcoming items={item} title='Latest Movies' />
      <Upcoming items={rec} title='Recommended Movies' />
      <Footer />
    </>
  )
}

export default HomePage
