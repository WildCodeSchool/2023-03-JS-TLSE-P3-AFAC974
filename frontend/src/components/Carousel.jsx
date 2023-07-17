import PropTypes from "prop-types";
import { useState } from "react";

export default function Carousel({ imageUrls, disableRightClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-row justify-evenly items-center">
      <div className="carousel flex flex-row justify-evenly items-center">
        <button
          className="relative top-1/2 transform-translate-y-1/2"
          type="button"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="h-8 w-8 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className="slide-container relative overflow-hidden flex flex-col justify-center items-center">
          {imageUrls.map((item, index) => (
            <div
              key={item.id}
              className={`slide ${
                index === currentIndex ? "translate-x-0" : "hidden"
              } transition-transform duration-500 relative left-0 top-50 flex flex-col justify-center items-center`}
            >
              <img
                src={item}
                alt="art"
                className="flex justify-center items-center drop-shadow-xl"
                onContextMenu={disableRightClick}
              />
            </div>
          ))}
        </div>

        <button
          className="relative top-1/2 transform-translate-y-1/2"
          type="button"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="h-8 w-8 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
Carousel.propTypes = {
  imageUrls: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
  disableRightClick: PropTypes.func,
};

Carousel.defaultProps = {
  imageUrls: [],
  disableRightClick: () => {},
};
