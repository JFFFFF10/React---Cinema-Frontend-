import React, { useState } from "react"
import Homes from "../components/homes/Homes"
import Trending from "../components/trending/Trending"
import Upcomming from "../components/upcoming/Upcoming"
import { latest, recommended, upcome } from "../dummyData"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  const [items, setItems] = useState(upcome)
  const [item, setItem] = useState(latest)
  const [rec, setRec] = useState(recommended)
  return (
    <>
      <Header />
      <Homes />
      
      <Upcomming items={items} title='Upcoming Movies' />
      <Upcomming items={item} title='Latest Movies' />
      <Trending />
      <Upcomming items={rec} title='Recommended Movies' />
      <Footer />
    </>
  )
}

export default HomePage
