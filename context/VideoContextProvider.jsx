import React, { useState } from "react";
import VideoContext from "./VideoContext";

const VideoContextProvider = ({ children }) => {
  const [video, setVideo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vid,setVid]=useState();
  const [playVideo,setPlayVideo]=useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    getVideo(searchQuery, 1, 12); // Call with search term
  };
  const getVideo = async (query = "", page = 1, limit = 12, sortBy = "createdAt", sortType = 1) => {
    //API call
    const response = await fetch(`http://localhost:8000/api/v1/videos/?query=${query}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType} `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    if (json.success) {
      console.log(json.data.videos);
      setVideo(json.data.videos);
      // console.log(video);
    } else {
    }
  };

  const handleVideo = async (vid) => {
    //API call
    const response = await fetch(`http://localhost:8000/api/v1/videos/${vid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    if (json.success) {
      console.log("This is from handle data function in video context",json.data);
      setPlayVideo(json.data);
      // console.log(video);
    } else {
    }
  };

  return (
    <VideoContext.Provider value={{ video, setVideo,playVideo,setPlayVideo, getVideo, handleVideo,vid,setVid,handleSearch,searchQuery,setSearchQuery }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
