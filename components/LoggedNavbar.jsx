import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HistoryIcon from "@mui/icons-material/History";

const LoggedNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    {/* Sidebar */}
    <div
    className={`fixed top-0 left-0 w-1/2 md:w-1/4 lg:w-1/6 bg-white border-r h-full transition-transform transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } z-20`}
  >
    <ul className="space-y-4 p-4">
      <li className="cursor-pointer p-2 hover:bg-gray-200 rounded-lg">
        <a href="#" className="flex items-center space-x-2">
          <HomeIcon className="text-xl" />
          <span>Home</span>
        </a>
      </li>
      <li className="cursor-pointer p-2 hover:bg-gray-200 rounded-lg">
        <a href="#" className="flex items-center space-x-2">
          <SubscriptionsIcon className="text-xl" />
          <span>Subscriptions</span>
        </a>
      </li>
      <li className="cursor-pointer p-2 hover:bg-gray-200 rounded-lg">
        <a href="#" className="flex items-center space-x-2">
          <LibraryBooksIcon className="text-xl" />
          <span>Playlist</span>
        </a>
      </li>
      <li className="cursor-pointer p-2 hover:bg-gray-200 rounded-lg">
        <a href="#" className="flex items-center space-x-2">
          <HistoryIcon className="text-xl" />
          <span>History</span>
        </a>
      </li>
    </ul>
  </div>

  {/* Main Content */}
    {/* Header */}
    <div className="top-0 z-10  p-4 flex items-center justify-between text-white">
      <div className="flex items-center space-x-3">
        <MenuIcon className="text-3xl cursor-pointer" onClick={toggleSidebar} />
        <h1 className="text-xl font-semibold">Twibeo</h1>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="w-96 bg-gray-100 p-2 rounded-full focus:outline-none"
        />
        <SearchIcon className="cursor-pointer" />
        </div>
        <div className="flex items-center space-x-4">
        <NotificationsIcon className="text-3xl cursor-pointer" />
        <AccountCircleIcon className="text-3xl cursor-pointer" />
      </div>
    </div>    
  </>

  );
};




export default LoggedNavbar;
