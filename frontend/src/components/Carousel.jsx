import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import arrowR from "../assets/Fleche droite.png";
import arrowL from "../assets/Fleche gauche.png";

export default function Carousel({ imageUrls, disableRightClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [window]);

  useEffect(() => {
    // Update the `isMobile` state when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const isPortrait = imageDimensions.height > imageDimensions.width;

  return (
    <section className="flex flex-col justify-center w-full">
      <div className="flex items-center justify-between w-full lg:w-[80%] mx-auto my-12">
        <button type="button" onClick={handlePrev}>
          <img src={arrowL} alt="left arrow" className="h-14 w-16 " />
        </button>
        <h2 className="text-[21px] sm:text-[28px] md:text-[32px] tracking-[0.32px] text-center">
          MON UNIVERS ARTISTIQUE
        </h2>
        <button type="button" onClick={handleNext}>
          <img src={arrowR} alt="right arrow" className="h-14 w-16" />
        </button>
      </div>
      <div className="flex flex-row justify-center w-[50dvw] h-[19dvh] items-center md:w-[95%] md:h-[25dvh] sm:w-[95%] sm:h-[25dvh]  mb-5 xl:h-[35dvh] xl:w-[80%] mx-auto bg-[#257593] drop-shadow-[5px_5px_5px_#A49D97]">
        <div className="flex flex-row items-center">
          {isMobile ? (
            <div className="slide-container relative overflow-hidden w-full flex flex-row justify-center items-center">
              {[
                (currentIndex - 1 + imageUrls.length) % imageUrls.length,
                currentIndex,
                (currentIndex + 1) % imageUrls.length,
              ]
                .slice(0, 1)
                .map((index) => {
                  const imageUrl = imageUrls[index];

                  if (!imageUrl) {
                    return null; // Skip rendering if the image URL is invalid
                  }

                  return (
                    <div
                      className="slide w-1/3 transition-all duration-500 relative flex flex-col justify-center items-center"
                      key={index}
                    >
                      <NavLink
                        to={`/gallery/${imageUrl[1]}`}
                        onClick={window.scrollTo(0, 0)}
                      >
                        <img
                          src={imageUrl[0]}
                          alt="art"
                          className={`flex justify-center items-center drop-shadow-xl object-contain ${
                            isPortrait
                              ? "max-w-[35dvw] max-h-[17dvh] w-[30dvw] h-[15dvh]"
                              : " max-w-[45dvw] max-h-[17dvh] w-[40dvw] h-[15dvh]"
                          }`}
                          onContextMenu={disableRightClick}
                        />
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="slide-container relative overflow-hidden w-full flex flex-row justify-center items-center gap-10">
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
                    <NavLink
                      to={`/gallery/${imageUrl[1]}`}
                      onClick={window.scrollTo(0, 0)}
                    >
                      <img
                        src={imageUrl[0]}
                        alt="art"
                        className={`flex justify-center items-center drop-shadow-xl object-contain ${
                          isPortrait
                            ? "max-w-[30dvw] max-h-[40dvh]"
                            : "w-[20dvw] h-[20dvh]"
                        }`}
                        onContextMenu={disableRightClick}
                      />
                    </NavLink>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
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
