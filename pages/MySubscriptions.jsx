import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HistoryIcon from "@mui/icons-material/History";
import UserContext from "../context/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';

const SubscriptionsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("subscribers");
  const {handleLogout}=useContext(UserContext)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "subscribers":
        return (
          <div className="flex flex-wrap gap-4 justify-center">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <div key={index} className="w-72 bg-gray-200 h-auto rounded-3xl my-3 flex items-center cursor-pointer">
                  <img
                    src={`https://randomuser.me/api/portraits/thumb/men/${index + 1}.jpg`}
                    alt={`Subscriber ${index + 1}`}
                    className="w-10 h-10 rounded-full ml-4"
                  />
                  <p className="text-lg ml-4">Subscriber {index + 1}</p>
                </div>
              ))}
          </div>
        );
      case "subscriptions":
        return (
          <div className="flex flex-wrap gap-6 justify-center">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div key={index} className="w-72 bg-gray-200 h-auto rounded-3xl my-3 flex items-center cursor-pointer">
                  <img
                    src={`https://randomuser.me/api/portraits/thumb/women/${index + 1}.jpg`}
                    alt={`Channel ${index + 1}`}
                    className="w-10 h-10 rounded-full ml-4"
                  />
                  <p className="text-lg ml-4">Channel {index + 1}</p>
                </div>
              ))}
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
            <Link to="/Profile/abcd">
            <AccountCircleIcon
              fontSize="large"
              className="text-3xl cursor-pointer"
            />
            </Link>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-6 mt-8">
          {/* Tabs */}
          <div className="border-b border-gray-600 text-white">
            <button
              className={`px-6 py-2 ${
                activeTab === "subscribers" ? "border-b-2 border-white" : ""
              }`}
              onClick={() => setActiveTab("subscribers")}
            >
              <PeopleIcon /> Subscribers
            </button>
            <button
              className={`px-6 py-2 ${
                activeTab === "subscriptions" ? "border-b-2 border-white" : ""
              }`}
              onClick={() => setActiveTab("subscriptions")}
            >
              <SubscriptionsIcon /> Subscriptions
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">{renderTabContent()}</div>
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

export default SubscriptionsPage;
