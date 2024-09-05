import React, { useState } from "react";
import VideoContext from "./VideoContext";

const VideoContextProvider = ({ children }) => {
  const [video, setVideo] = useState([]);
  const [vid,setVid]=useState();
  const [playVideo,setPlayVideo]=useState({});
  const getVideo = async () => {
    //API call
    const response = await fetch("http://localhost:8000/api/v1/videos/", {
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
    <VideoContext.Provider value={{ video, setVideo,playVideo,setPlayVideo, getVideo, handleVideo,vid,setVid }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
