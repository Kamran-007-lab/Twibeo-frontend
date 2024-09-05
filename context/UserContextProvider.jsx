import React, { useState } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
const UserContextProvider = ({ children }) => {
    let navigate = useNavigate();
    const[currentUser,setCurrentUser]=useState({});
    function errormessage(message) {
        let dropdown = document.getElementById("errormessage");
        dropdown.innerHTML = message;
        dropdown.classList.toggle("hidden");
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
        console.log("hello xyz user",json);
        // navigate("/");
        setCurrentUser(json.data)
      }
      else{
        console.log("errrrrrr")
        errormessage(json.error);
      }
    }
    
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
      <UserContext.Provider value={{ handleLogout, getCurrentUser, timeAgo, errormessage }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserContextProvider;