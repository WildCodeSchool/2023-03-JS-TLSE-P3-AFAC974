import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Carousel({ imageUrls, disableRightClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({});
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = imageUrls[currentIndex];
  }, [currentIndex, imageUrls]);

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

  useEffect(() => {
    setCurrentIndex(0);
  }, [imageUrls]);

  const isPortrait = imageDimensions.height > imageDimensions.width;

  return (
    <div className="flex flex-row justify-evenly items-center md:w-[95%] border-4 border-green-700 border-solid mb-5 h-[35dvh] xl:w-[80%] mx-auto bg-blue-900">
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

        <div className="slide-container relative overflow-hidden w-full flex flex-row justify-center items-center">
          {[
            (currentIndex - 1 + imageUrls.length) % imageUrls.length,
            currentIndex,
            (currentIndex + 1) % imageUrls.length,
          ].map((index) => {
            const imageUrl = imageUrls[index];

            if (!imageUrl) {
              return null; // Skip rendering if the image URL is invalid
            }

            return (
              <div
                className="slide w-1/3 transition-all duration-500 relative flex flex-col justify-center items-center"
                key={index}
              >
                <Link to={`/gallery/${imageUrl[1]}`}>
                  <img
                    src={imageUrl[0]}
                    alt="art"
                    className={`flex justify-center items-center drop-shadow-xl object-contain ${
                      isPortrait
                        ? "max-w-[30dvw] max-h-[30dvh]"
                        : "w-[20dvw] h-[25dvh]"
                    }`}
                    onContextMenu={disableRightClick}
                  />
                </Link>
              </div>
            );
          })}
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
