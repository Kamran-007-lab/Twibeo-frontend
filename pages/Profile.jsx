import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import add from "../components/images/add.png";

const Profile = () => {
  const { userId } = useParams();
  // console.log("This is user Id",userId);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [myVideos, setMyVideos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("videos");
  const { handleLogout, getCurrentUser, currentUser } = useContext(UserContext);
  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    getMyVideos(userId);
  }, []);


  const handleMouseEnter = (videoId) => {
    setHoveredVideoId(videoId);
  };

  const handleMouseLeave = () => {
    setHoveredVideoId(null);
  };

  const deleteVideo = async (videoId) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/videos/${videoId}`,
      {
        // mode: 'no-cors',
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      // Handle error response
      console.log(response);
      const errorText = await response.text();
      console.error("Error response:", errorText);
      // errormessage("Failed to get my videos");
      return;
    }

    const json = await response.json();
    if (json.success) {
      console.log("Deleted this video", json);
      // navigate("/");
      // setMyVideos(json.data);
      getMyVideos(userId);
      // console.log(currentUser)
    } else {
      console.log("errrrrrr");
      // errormessage(json.error);
    }
  };




  const getMyVideos = async (userId) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/videos/myvideos/${userId}`,
      {
        // mode: 'no-cors',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      // Handle error response
      console.log(response);
      const errorText = await response.text();
      console.error("Error response:", errorText);
      // errormessage("Failed to get my videos");
      return;
    }

    const json = await response.json();
    if (json.success) {
      console.log("My uploaded videos are", json);
      // navigate("/");
      setMyVideos(json.data);
      // console.log(currentUser)
    } else {
      console.log("errrrrrr");
      // errormessage(json.error);
    }
  };

  // console.log(currentUser);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "videos":
        return (
          <div className="flex flex-wrap gap-4 justify-center">
            {myVideos.map((video) => (
            <div
              key={video._id}
              className="relative bg-gray-200 rounded-lg m-3 cursor-pointer hover:scale-110 duration-200"
              onMouseEnter={() => handleMouseEnter(video._id)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="h-36 w-72 rounded-lg"
                src={video.thumbnail}
                alt={video.title}
              />
              <p className="text-center pt-1 text-lg">{video.title}</p>
              {/* Show delete icon only on hovered video */}
              {hoveredVideoId === video._id && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div  onClick={() => deleteVideo(video._id)}
                  className="flex justify-center text-center items-center space-x-2 cursor-pointer text-white">
                    <DeleteIcon className="text-xl" />
                    <span>Delete</span>
                  </div>
                </div>
              )}
            </div>
          ))}
            <Link to="/UploadVideo">
              <div className=" mt-4 cursor-pointer hover:scale-110 duration-200">
                <img className="h-36 w-36 text-white invert" src={add} alt="" />
                <p className="text-white text-center p-2">Upload Video</p>
              </div>
            </Link>
          </div>
        );
      case "playlists":
        return (
          <div className="flex flex-wrap gap-6">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div key={index} className="w-64 bg-gray-200 h-36 rounded-lg">
                  <p className="text-center pt-12 text-lg">
                    Playlist {index + 1}
                  </p>
                </div>
              ))}
          </div>
        );
      case "about":
        return (
          <div className="text-white">
            <p>
              <strong>Description:</strong> This is an example user profile
              page.
            </p>
            <p>
              <strong>Joined:</strong> January 1, 2023
            </p>
            <p>
              <strong>Views:</strong> 1,000,000
            </p>
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
            <Link to={`/Profile/${currentUser?._id}`}>
              <img
                src={currentUser?.avatar}
                className="h-10 w-10 rounded-full cursor-pointer hover:scale-110 border-b-2 border duration-150"
                alt=""
              />
              {/* <AccountCircleIcon fontSize="large" className="text-3xl cursor-pointer" /> */}
            </Link>
          </div>
        </div>

        {/* Profile Content */}
        <div className="min-h-screen">
          {/* Banner */}
          <div
            className="relative h-96 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentUser?.coverImage})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src={currentUser?.avatar}
                alt="Avatar"
                className="rounded-full h-52 w-52 object-cover border-4 border-white"
                style={{ marginTop: "0px" }} // Pull avatar up into the banner
              />
              <div className="text-center mt-4">
                <h1 className="text-3xl font-bold text-white">
                  {currentUser?.username}
                </h1>
                <p className="text-gray-400">1M subscribers</p>
                <button className="mt-2 bg-white hover:text-white hover:bg-gradient-to-br from-emerald-100 to-black text-black font-bold py-2 px-4 rounded-lg">
                  Edit Profile
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
