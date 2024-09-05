import React from "react";
import carouselvid from "./images/Carousel.mp4";

const Carousel = () => {
  return (
    <div className="w-full h-screen relative p-0 m-0">
      <video
        className="w-full h-full object-cover p-0 m-0"
        src={carouselvid}
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div>
    </div>
  );
};

export default Carousel;
