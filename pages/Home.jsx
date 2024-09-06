import React, { useState,useEffect,useContext } from 'react';
import { useNavigate,Link } from "react-router-dom";
import LoggedNavbar from '../components/LoggedNavbar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import VideoContext from '../context/VideoContext';
import UserContext from '../context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {

  const{video,setVid,getVideo}=useContext(VideoContext)
  const{currentUser,getCurrentUser}=useContext(UserContext)
  useEffect(() => {
    getVideo();
    // getCurrentUser();
  }, []);

  useEffect(()=>{
    getCurrentUser();
  },[]);


  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("Current User checking:", currentUser); // Check the state here
  //   }
  // }, [currentUser]);

  console.log(currentUser)
  let navigate = useNavigate();

  function errormessage(message) {
    let dropdown = document.getElementById("errormessage");
    dropdown.innerHTML = message;
    dropdown.classList.toggle("hidden");
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // http://localhost:8000/api/v1/users/logout

  const handleVideo = async (vid) => {
    //API call
    setVid(vid);
    console.log("This is from Home jsx",vid);
    const response = await fetch(`http://localhost:8000/api/v1/videos/${vid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    if (json.success) {
      console.log(json);
      navigate(`/GetVideo/${vid}`);
      // setVideo(json.data.videos);
      // console.log(video);
    } else {
    }
  };



  const handleLogout =async() => {
    const response = await fetch("http://localhost:8000/api/v1/users/logout", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });
    if (!response.ok) {
      // Handle error response
      console.log(response)
      const errorText = await response.text();
      console.error("Error response:", errorText);
      errormessage("Failed to log in");
      return;
    }
    
    const json=await response.json();
    if(json.success){
      console.log("hello");
      navigate("/");
    }
    else{
      console.log("errrrrrr")
      errormessage(json.error);
    }

  }
  const timeAgo = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const secondsAgo = Math.floor((now - createdAt) / 1000);
  
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const weeksAgo = Math.floor(daysAgo / 7);
  
    if (weeksAgo > 0) {
      return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
    } else if (daysAgo > 0) {
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (minutesAgo > 0) {
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else {
      return `Just now`;
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
            <MenuIcon fontSize="large" className="text-9xl cursor-pointer h-4" onClick={toggleSidebar} />
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
            <NotificationsIcon fontSize="large" className="text-3xl cursor-pointer" />
            <Link to={`/Profile/${currentUser?._id}`} >
            <AccountCircleIcon fontSize="large" className="text-3xl cursor-pointer" />
            </Link>
          </div>
        </div>

        {/* Video Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {video.map((video, index) => (
            <div key={index} onClick={() => handleVideo(video._id)} className="bg-white shadow-lg rounded-lg overflow-hidden hover:cursor-pointer hover:scale-110 duration-200">
              <div className="h-40 bg-gray-300 flex items-center justify-center ">
              <img src={video.thumbnail} className='w-full h-full' alt="" />
                {/* <PlayCircleOutlineIcon className="text-5xl text-gray-400" /> */}
              </div>
              <div className="p-2">
                <h2 className="font-semibold text-lg mb-2">
                {video.title}</h2>
                <div className='flex flex-row gap-2 items-center'>
                <img src={video.owner.avatar} alt="avatar" className='rounded-full w-6 h-6' />
                <span className="text-sm text-gray-500">{video.owner.username}</span>
                </div>
                
                <p className="text-sm text-gray-500">{video.views} views • {timeAgo(video.createdAt)}</p>
              </div>
            </div>
          ))}
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

export default Home;
