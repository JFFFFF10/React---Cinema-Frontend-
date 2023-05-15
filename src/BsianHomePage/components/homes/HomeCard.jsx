import React from "react"
import { Link } from "react-router-dom"

const HomeCard = ({ item: { id, cover, name, rating, time, desc, starring, genres, tags, video } }) => {
  return (
    <>
      <div className='box'>
        <div className='coverImage'>
          <img src={cover} alt='' />
        </div>
        <div className='content flex'>
          <div className='details row'>
            <h1>{name}</h1>
            <div className='time flex'>
              <label>{time}</label>
            </div>
            <p className="description">{desc}</p>
            <div className='cast'>
              <h4>
                <span>Starring </span>
                {starring}
              </h4>
              <h4>
                <span>Genres </span>
                {genres}
              </h4>
              <h4>
                <span>Tags </span>
                {tags}
              </h4>
            </div>
            <Link to={`/movie/${id}`}>
              <button className='primary-btn'>
                <i className='fas fa-play'></i> VIEW TRAILER
              </button>
            </Link>
          </div>
          {/* <div className='palyButton row'>
            <Link to={`/movie/${name}`}>
              <button>
                <div className='img'>
                  <img src='./images/play-button.png' alt='' />
                  <img src='./images/play.png' className='change' />
                </div>
                WATCH TRAILER
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default HomeCard
