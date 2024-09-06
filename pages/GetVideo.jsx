import React, { useState, useContext, useEffect } from "react";
import LoggedNavbar from "../components/LoggedNavbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from '@mui/icons-material/Logout';
import VideoContext from "../context/VideoContext";
import UserContext from "../context/UserContext";
import { Link, useParams ,useNavigate } from "react-router-dom";

const GetVideo = () => {
  let navigate=useNavigate();
  const { videoId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comment, setComment] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const { video, playVideo, handleVideo, vid, setVid, getVideo } =
    useContext(VideoContext);
  const { handleLogout, timeAgo, errormessage,subscribeStatus,toggleSubscription,currentUser,getCurrentUser } = useContext(UserContext);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getVideo();
    getCurrentUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (videoId) {
        const response = await handleVideo(videoId);
        await getComment(videoId);
      }
    }
    fetchData();
  }, [videoId, counter]);

  useEffect(() => {
    console.log("playVideo updated:", playVideo);
  }, [playVideo]);

  useEffect(() => {
    console.log("Commets updated:", comment);
  }, [comment]);

  const onChangeComment = (e) => {
    setCurrentComment(e.target.value);
  };
  const handleCommentSubmit = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/comments/${videoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: currentComment,
        }),
        credentials: "include",
      }
    );
    const json = await response.json();
    if (json.success) {
      console.log(json);
      setCurrentComment("");
      setCounter(counter + 1);
      // setComment(json.data);
    } else {
      errormessage(json.error);
    }
  };

  const getComment = async (vid) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/comments/${vid}`,
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
      setComment(json.data);
    } else {
    }
  };

  const handleDelete = async (cid) => {
    //API call
    // setVid(vid);
    // console.log("This is from Home jsx",vid);
    const response = await fetch(
      `http://localhost:8000/api/v1/comments/c/${cid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const json = await response.json();
    if (json.success) {
      setCounter(counter - 1);
      // console.log(json);
      // navigate("/GetVideo");
      // setVideo(json.data.videos);
      // console.log(video);
    } else {
      alert("You can only delete your own posted comments");
      // console.log("errrrroooor");
      // errormessage(json.error);
    }
  };

  const handelVideo = async (vid) => {
    //API call
    setVid(vid);
    console.log("This is from Home jsx", vid);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
            <Link to={`/MySubscriptions/${currentUser._id}`} className="flex items-center space-x-2">
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
        <div className="flex-1 flex">
          <div className="w-full md:w-2/3 p-6">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                className="w-full"
                style={{ height: "500px" }} // Adjust the height as needed
                controls
                src={playVideo.videoFile}
              ></video>
            </div>

            {/* Video Info */}
            <div className="mt-4 text-white">
              <h2 className="text-3xl font-bold">Video Title</h2>
              <p className="text-sm text-white">1M views • 1 week ago</p>
              <div  className="flex items-center space-x-4 mt-2">
                <button className="hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white bg-white text-black font-bold py-2 px-4 rounded-lg">
                  Like
                </button>
                <button id="subscribe" onClick={() => toggleSubscription(playVideo.owner._id)} className="hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white bg-white text-black font-bold py-2 px-4 rounded-lg">
                {subscribeStatus===false ?"Subscribe":"Unsubscribe"}
                </button>
                <button className="hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white bg-white text-black font-bold py-2 px-4 rounded-lg">
                  Add to playlist
                </button>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-white">Comments</h3>
              <div id="comment-div" className="mt-4">
                <input
                  type="text"
                  name="content"
                  value={currentComment}
                  onChange={onChangeComment}
                  placeholder="Add a public comment..."
                  className="w-full p-2 rounded-lg bg-white text-black focus:outline-none"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="mt-6 hover:bg-gradient-to-br from-emerald-100 to-black hover:text-white bg-white text-black font-bold py-2 px-4 rounded-lg"
                >
                  Comment
                </button>
              </div>
              <div className="my-6">
                {/* Example Comment */}
                {comment.map((comment, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col space-x-4 border-2  border-white rounded-lg my-3 "
                    >
                      <div className="flex flex-row text-white items-center gap-x-2">
                        <img
                          src={comment.owner.avatar}
                          className="w-4 h-4 rounded-full ml-3"
                          alt=""
                        />
                        <p className="font-bold">{comment.owner.username}</p>
                      </div>

                      {/* <AccountCircleIcon
                    fontSize="large"
                    className="text-3xl cursor-pointer"
                  /> */}
                      <div className="text-white">
                        <div
                          id="delete"
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-white">
                            {timeAgo(comment.createdAt)}
                          </span>
                          <span
                            onClick={() => handleDelete(comment._id)}
                            className="mr-3 cursor-pointer hover:scale-150 duration-200"
                          >
                            <DeleteIcon />
                          </span>
                        </div>
                        <p className="text-white">{comment.content}</p>
                      </div>
                    </div>
                  );
                })}
                {/* error message */}
              </div>
            </div>
          </div>

          {/* Suggested Videos */}
          <div className="hidden md:block w-1/3 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Up Next</h3>
            {video.map((video, index) => (
              <div
                key={index}
                onClick={() => handelVideo(video._id)}
                className="flex space-x-4 my-4 h-20 cursor-pointer hover:scale-105 duration-200"
              >
                <div className="w-1/3 bg-white flex items-center justify-center rounded-lg">
                  <img
                    src={video.thumbnail}
                    className="w-full h-full rounded-lg"
                    alt=""
                  />
                </div>
                <div className="w-2/3 py-2">
                  <h4 className="text-white font-bold">{video.title}</h4>
                  <p className="text-sm text-white">{video.owner.username}</p>
                  <p className="text-sm text-white">
                    {video.views} views • 2 days ago
                  </p>
                </div>
              </div>
            ))}
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

export default GetVideo;
