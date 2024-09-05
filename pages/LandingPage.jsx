import React from "react";
import Navbar from "../components/Navbar.jsx";
import Carousel from "../components/Carousel.jsx";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
        <Navbar />

        {/* Carousel section */}
        <Carousel />
        {/* Overlay section */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-30 p-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Discover a World of Endless Entertainment
          </h1>
          <br />
          <h1 className="text-5xl font-bold text-white">
            <TypeAnimation
              sequence={[
                "Create !",
                2000,
                "Innovate !",
                2000,
                "Design !",
                2000,
                "Stream !",
                2000,
              ]}
              speed={50}
              className=" text-6xl font-semibold text-white w-full font-write"
              wrapper="p"
              repeat={Infinity}
            />
          </h1>
          <p className="text-xl md:text-3xl text-white mt-4 max-w-4xl">
            Join millions of users in exploring trending videos, following your
            favorite creators, and sharing your own content.
          </p>
          <p className="mt-6 p-4 justify-between">
          <Link to="/CreateProfile"><button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-16 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-emerald-100 to-black group-hover:from-emerald-100 group-hover:to-black hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-xl">
              Get started, sign up now
            </span>
          </button>
          </Link>
          <Link to="/Login"><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-emerald-100 to-black group-hover:from-emerald-100 group-hover:to-black hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-xl">
              Existing user, please log in
            </span>
          </button>
          </Link>
          </p>
        </div>
    </>
  );
};

export default LandingPage;
