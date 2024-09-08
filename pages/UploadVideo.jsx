import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import UserContext from "../context/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import CircularProgress from "@mui/material/CircularProgress"; // Material UI spinner

const UploadVideo = () => {
  let navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Track uploading state
  const { handleLogout, getCurrentUser, currentUser } = useContext(UserContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Start spinner

    const form = document.getElementById("form");
    const data = new FormData(form);
    try {
      const response = await fetch("http://localhost:8000/api/v1/videos/", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const json = await response.json();
      if (json.success) {
        navigate("/Home");
      } else {
        console.log(json.error);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false); // Stop spinner after upload
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-emerald-100 relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-1/2 md:w-1/4 lg:w-1/6 bg-gradient-to-br from-emerald-100 to-black border-r rounded-lg h-full transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-20`}
      >
        <ul className="space-y-4 p-4">
          <li className="cursor-pointer p-2 hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white rounded-lg">
            <Link to="/Home" className="flex items-center space-x-2">
              <HomeIcon className="text-xl" />
              <span>Home</span>
            </Link>
          </li>
          <li className="cursor-pointer p-2 hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white rounded-lg">
            <Link
              to={`/MySubscriptions/${currentUser?._id}`}
              className="flex items-center space-x-2"
            >
              <SubscriptionsIcon className="text-xl" />
              <span>Subscriptions</span>
            </Link>
          </li>
          <li className="cursor-pointer p-2 hover:bg-gradient-to-br from-emerald-100  to-black hover:text-white rounded-lg">
            <Link to="/Playlist" className="flex items-center space-x-2">
              <LibraryBooksIcon className="text-xl" />
              <span>Playlist</span>
            </Link>
          </li>
          <li className="cursor-pointer p-2 hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white rounded-lg">
            <Link to="/WatchHistory" className="flex items-center space-x-2">
              <HistoryIcon className="text-xl" />
              <span>History</span>
            </Link>
          </li>
          <li
            onClick={handleLogout}
            className="cursor-pointer p-2 hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white rounded-lg"
          >
            <Link className="flex items-center space-x-2">
              <LogoutIcon className="text-xl" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="top-0 z-10 p-2 flex items-center justify-between text-white">
          <div className="flex items-center space-x-4 ml-3">
            <MenuIcon
              fontSize="large"
              className="text-9xl cursor-pointer h-4"
              onClick={toggleSidebar}
            />
            <h1 className="text-6xl mt-1 pt-2 font-signature">Twibeo</h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="w-96 bg-gray-100 p-2 rounded-full focus:outline-none text-black"
            />
            <SearchIcon fontSize="large" className="cursor-pointer" />
          </div>
          <div className="flex items-center space-x-4 mr-4">
            <NotificationsIcon
              fontSize="large"
              className="text-3xl cursor-pointer"
            />
            <Link to={`/Profile/${currentUser?._id}`}>
              <img
                src={currentUser?.avatar}
                className="h-10 w-10 rounded-full cursor-pointer hover:scale-110 border-b-2 border duration-150"
                alt=""
              />
            </Link>
          </div>
        </div>

        {/* Upload Video Section */}
        <div className="px-6 mt-8 flex justify-center items-center">
          <div className="p-5 mb-8 border-dashed border-2 border-black rounded-3xl flex justify-center items-center h-5/6 w-9/12">
            {isUploading ? (
              <div className="flex flex-col items-center justify-center">
                <CircularProgress color="inherit" />
                <p className="text-white mt-4">Uploading video, please wait...</p>
              </div>
            ) : (
              <form
                id="form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="w-3/6 flex flex-col"
              >
                <div className="text-5xl font-semibold justify-center items-center align-middle mt-4 mb-6 mx-auto text-white font-fornavbar">
                  Video Details
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="mb-2 text-lg font-medium text-white"
                  >
                    Video Title
                  </label>
                  <input
                    className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border focus:ring-red-500 focus:border-red-500"
                    type="title"
                    id="title"
                    name="title"
                    placeholder="Enter video title"
                    required
                  />
                </div>

                <div className="mb-6 w-full mr-2">
                  <label
                    htmlFor="description"
                    className="mb-2 text-lg font-medium text-white"
                  >
                    Description
                  </label>
                  <input
                    type="description"
                    id="description"
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    placeholder="Enter video description"
                    required
                  />
                </div>

                <div className="w-full mb-6">
                  <label
                    className="block mb-2 text-lg font-medium text-white"
                    htmlFor="thumbnail"
                  >
                    Thumbnail
                  </label>

                  <input
                    className="block w-full py-2 px-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                  />

                  <label
                    className="block mb-2 mt-6 text-lg font-medium text-white"
                    htmlFor="videoFile"
                  >
                    Video File
                  </label>

                  <input
                    className="block w-full py-2 px-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    id="videoFile"
                    name="videoFile"
                    type="file"
                  />
                </div>

                <button className="mt-6 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-emerald-100 to-black group-hover:from-emerald-100 group-hover:to-black hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-green-800">
                  <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-xl">
                    Upload
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default UploadVideo;
