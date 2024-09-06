import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
const UserContextProvider = ({ children }) => {
    let navigate = useNavigate();
    const[subscribeStatus,setSubscribeStatus]=useState(false);
    const[currentUser,setCurrentUser]=useState();
    const[subscribers,setSubscribers]=useState([]);
    const[subscriptions,setSubscriptions]=useState([]);
    
    function errormessage(message) {
        let dropdown = document.getElementById("errormessage");
        dropdown.innerHTML = message;
        dropdown.classList.toggle("hidden");
      }

      const toggleSubscription= async(channelId) => {
        const response = await fetch(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {
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
          errormessage("Failed to get current user");
          return;
        }
        
        const json=await response.json();
        if(json.success){
          console.log("hello xyz user",json);
          // navigate("/");
          setSubscribeStatus((prevStatus) => !prevStatus)
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
      const getSubscribers= async(channelId) => {
        const response = await fetch(`http://localhost:8000/api/v1/subscriptions/u/${channelId}`, {
          // mode: 'no-cors',
          method: "GET",
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
          errormessage("Failed to get current user");
          return;
        }
        
        const json=await response.json();
        if(json.success){
          console.log("hello this is get subscriber",json);
          // navigate("/");
          setSubscribers(json.data)
        }
        else{
          console.log("errrrrrr")
          errormessage(json.error);
        }
      }
      const getSubscriptions= async(subscriberId) => {
        const response = await fetch(`http://localhost:8000/api/v1/subscriptions/c/${subscriberId}`, {
          // mode: 'no-cors',
          method: "GET",
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
          errormessage("Failed to get subscription value");
          return;
        }
        
        const json=await response.json();
        if(json.success){
          console.log("hello this is get subscriptions",json);
          // navigate("/");
          setSubscriptions(json.data)
        }
        else{
          console.log("errrrrrr in getting json from subscription")
          errormessage(json.error);
        }
      }
    const getCurrentUser= async() => {
      const response = await fetch("http://localhost:8000/api/v1/users/current-user", {
        // mode: 'no-cors',
        method: "GET",
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
        errormessage("Failed to get current user");
        return;
      }
      
      const json=await response.json();
      if(json.success){
        console.log("hello xyz user is currently logged in",json);
        // navigate("/");
        setCurrentUser(json.data)
        // console.log(currentUser)
      }
      else{
        console.log("errrrrrr")
        errormessage(json.error);
      }
    }
    
    // useEffect(() => {
    //   getCurrentUser();
    // }, []);

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
  
    return (
      <UserContext.Provider value={{ handleLogout,currentUser, getCurrentUser, timeAgo, errormessage,subscribers,setSubscribers,subscriptions,setSubscriptions,getSubscribers,getSubscriptions,subscribeStatus,setSubscribeStatus,toggleSubscription }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserContextProvider;