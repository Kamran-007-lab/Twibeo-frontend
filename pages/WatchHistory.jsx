import React, { useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import UserContext from "../context/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';

const WatchHistoryPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [watchHistory, setWatchHistory]= useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const {handleLogout,getCurrentUser,currentUser}=useContext(UserContext)
  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchWatchHistory = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const json = await response.json();
      if (json.success) {
        console.log(json);
        setWatchHistory(json.data);
        // setComment(json.data);
      } else {
        errormessage(json.error);
      }
    };
    fetchWatchHistory();
  },[])






  const renderWatchHistory = () => {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {watchHistory
          .map((history) => (
            <div key={history?._id} className="w-72 bg-gray-200 rounded-lg my-3 cursor-pointer hover:scale-110 duration-200">
              <Link to={`/GetVideo/${history?._id}`}>
              <img className="h-36 w-72 rounded-lg" src={history?.thumbnail} alt="" />
              <div className="p-2">
                <p className="text-center text-sm text-black">{history?.title}</p>
              </div>
              </Link>
            </div>
          ))}
      </div>
    );
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
            <Link to={`/MySubscriptions/${currentUser?._id}`} className="flex items-center space-x-2">
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
            <Link to={`/Profile/${currentUser?._id}`} >
            <img src={currentUser?.avatar} className='h-10 w-10 rounded-full cursor-pointer hover:scale-110 border-b-2 border duration-150' alt="" />
            {/* <AccountCircleIcon fontSize="large" className="text-3xl cursor-pointer" /> */}
            </Link>
          </div>
        </div>

        {/* Watch History Section */}
        <div className="px-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Watch History</h2>
          {renderWatchHistory()}
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

export default WatchHistoryPage;
