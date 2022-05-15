import React, { useState } from "react";

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

import "./Carousel.css";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="carousel-wrapper">
      <div className="arrow left" onClick={prevSlide}>
        <FaAngleLeft className="FaAngle" />
      </div>
      <div className="arrow right" onClick={nextSlide}>
        <FaAngleRight className="FaAngle" />
      </div>
      {/* <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} /> */}

      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide activeSlide" : "slide"}
            key={index}
          >
            {index === current && (
              <div className="slide-image-wrapper">
                <img src={process.env.REACT_APP_ASSETS_URL +`${slide}`} alt={slide} />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Carousel;
