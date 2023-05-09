import React from "react";
import { Link } from "react-router-dom";
import Ucard from "./Ucard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const handleViewAllClick = () => {
	window.scrollTo(0, 0);
};

const SampleNextArrow = (props) => {
	const { onClick } = props;
	return (
		<div className="control-btn" onClick={onClick}>
			<button className="next">
        <FontAwesomeIcon icon={faAngleRight} />
			</button>
		</div>
	);
};
const SamplePrevArrow = (props) => {
	const { onClick } = props;
	return (
		<div className="control-btn" onClick={onClick}>
			<button className="prev">
      <FontAwesomeIcon icon={faAngleLeft} />
			</button>
		</div>
	);
};
const Upcoming = ({ items, title }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<>
			<section className="upcome">
				<div className="container">
					<div className="heading flexSB">
						<h1>{title}</h1>
						<Link to="/MoviesPage" onClick={handleViewAllClick}>View All</Link>
					</div>
					<div className="content">
						<Slider {...settings}>
							{items.map((item) => {
								return (
									<div key={item.movie_title}>
										<Ucard item={item} />
									</div>
								);
							})}
						</Slider>
					</div>
				</div>
			</section>
		</>
	);
};

export default Upcoming;
