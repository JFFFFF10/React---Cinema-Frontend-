import React from "react"
import { Link } from "react-router-dom"

const Ucard = ({ item: { movie_title, featureIMG, genre } }) => {
  return (
    <>
      <div className='MovieBox'>
        <div className='img'>
          <img src={featureIMG} alt='' />
        </div>
        <div className='text'>
          <h3>{movie_title}</h3>
          <span>{genre}</span> <br />
          <Link to={`/movie-detail/${encodeURIComponent(movie_title)}`}>
            <button className='primary-btn'>
              <i className='fa fa-play'></i> BOOK NOW
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Ucard
