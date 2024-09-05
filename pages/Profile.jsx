import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HistoryIcon from "@mui/icons-material/History";
import UserContext from "../context/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("videos");
  const {handleLogout}=useContext(UserContext)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "videos":
        return (
          <div className="flex flex-wrap gap-4 justify-between">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <div key={index} className="w-72 bg-gray-200 h-36 rounded-lg my-3">
                  <p className="text-center pt-12 text-lg">Video {index + 1}</p>
                </div>
              ))}
          </div>
        );
      case "playlists":
        return (
          <div className="flex flex-wrap gap-6">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div key={index} className="w-64 bg-gray-200 h-36 rounded-lg">
                  <p className="text-center pt-12 text-lg">Playlist {index + 1}</p>
                </div>
              ))}
          </div>
        );
      case "about":
        return (
          <div className="text-white">
            <p><strong>Description:</strong> This is an example user profile page.</p>
            <p><strong>Joined:</strong> January 1, 2023</p>
            <p><strong>Views:</strong> 1,000,000</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-emerald-100 relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-1/2 md:w-1/4 lg:w-1/6 bg-gradient-to-br from-emerald-100 to-black border-r rounded-lg h-full transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
            <Link to="/MySubscriptions" className="flex items-center space-x-2">
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
          <li onClick={handleLogout} className="cursor-pointer p-2 hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white rounded-lg">
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
        <div className="top-0 z-10  p-2 flex items-center justify-between text-white">
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
            <AccountCircleIcon
              fontSize="large"
              className="text-3xl cursor-pointer"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="min-h-screen">
          {/* Banner */}
          <div
            className="relative h-96 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1566679056462-2075774c8c07?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Avatar"
                className="rounded-full h-52 w-52 object-cover border-4 border-white"
                style={{ marginTop: "0px" }} // Pull avatar up into the banner
              />
              <div className="text-center mt-4">
                <h1 className="text-3xl font-bold text-white">User Name</h1>
                <p className="text-gray-400">1M subscribers</p>
                <button className="mt-2 bg-white hover:text-white hover:bg-gradient-to-br from-emerald-100 to-black text-black font-bold py-2 px-4 rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="px-6 mt-8">
            {/* Tabs */}
            <div className="border-b border-gray-600 text-white">
              <button
                className={`px-6 py-2 ${
                  activeTab === "videos" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("videos")}
              >
                <VideoLibraryIcon /> Videos
              </button>
              <button
                className={`px-6 py-2 ${
                  activeTab === "playlists" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("playlists")}
              >
                <PlaylistPlayIcon /> Playlists
              </button>
              <button
                className={`px-6 py-2 ${
                  activeTab === "about" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("about")}
              >
                <InfoIcon /> About
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">{renderTabContent()}</div>
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

export default Profile;
