import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LandingPage from "../pages/LandingPage.jsx";
import Navbar from "../components/Navbar.jsx";
import CreateProfile from "../pages/CreateProfile.jsx";
import UploadVideo from "../pages/UploadVideo.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import GetVideo from "../pages/GetVideo.jsx";
import Profile from "../pages/Profile.jsx";
import MySubscriptions from "../pages/MySubscriptions.jsx";
import WatchHistory from "../pages/WatchHistory.jsx";
import Playlist from "../pages/Playlist.jsx";
import VideoContextProvider from "../context/VideoContextProvider.jsx";
import UserContextProvider from "../context/UserContextProvider.jsx";
// import MyProfile from '../pages/MyProfile.jsx'
// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <UserContextProvider>
          <VideoContextProvider>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/Login" element={<Login />} />
              {/* <Route exact path="/SignUp" element={<SignUp />} /> */}
              {/* <Route exact path="/ForgotPass" element={<ForgotPass />} /> */}
              {/* <Route exact path="/AboutUs" element={<AboutUs />} /> */}
              {/* <Route exact path="/Download" element={<Download />} /> */}
              {/* <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} /> */}
              {/* <Route exact path="/TnC" element={<TnC />} /> */}
              <Route exact path="/CreateProfile" element={<CreateProfile />} />

              <Route exact path="/GetVideo/:videoId" element={<GetVideo />} />
              <Route
                exact
                path="/MySubscriptions/:id"
                element={<MySubscriptions />}
              />
              <Route exact path="/Playlist" element={<Playlist />} />
              <Route exact path="/Home" element={<Home />} />
              {/* <Route exact path="/MyProfile" element={<MyProfile />} /> */}
              <Route exact path="/Profile/:userId" element={<Profile />} />
              <Route exact path="/WatchHistory" element={<WatchHistory />} />
              <Route exact path="/UploadVideo" element={<UploadVideo />} />
            </Routes>
          </VideoContextProvider>
        </UserContextProvider>
      </Router>
    </>
  );
}

export default App;
