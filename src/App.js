import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import { useEffect } from "react";

import Home from "./components/Home";
import Header from "./components/Header";
import Uploadmodal from "./components/Uploadmodal";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import Error from "./components/Error";
import { AuthContext } from "./Context/UserContext";
import ProtectedRoues from "./components/ProtectedRoues";
import { storage } from "./components/Firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Chats from "./components/Chats/Chats";

function App() {
  const [UploadToggal, setUploadToggal] = useState(false);
  const [userProfilepic, setUserPorfilepic] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AdwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAgMBB//EADMQAAICAQICCAQEBwAAAAAAAAABAgMRBBIFIQYTMUFRYXGBIjJS0RSRwfAjM0JicoKx/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAMCAQT/xAAeEQEBAQEBAAIDAQAAAAAAAAAAAQIRMSFBAyIyEv/aAAwDAQACEQMRAD8A/RAAelEAAAAAAAAAAAAAAAAAAAAAAAAAPqUpSUYptvkkgPgLfS8IjtT1Mm39MXyXuTFw/SpY6iD9eZO7jf8AlnMgv7uF6ayPwxcH3OL/AEKbW6aektUJ81L5ZeJ2alcs48QEDbIAAAAAAAAAAJOh0n4uco79u1ZzjJcaPQV6V7k3Oz6n3ehC4D/Mu/xX6lyR3b3imYAAw0EfXaSvWUSqsz4prtT8SQAMZb1ukvlTcsuDxnxXiekbIyWYvJO6T1JW0Wpc5Jxft2FIm08p4Z6M3s6jfip4I9eoxyn+aPeLUllNNeR0fQAAAAAAAT+CzUdY4v8Ari179v3L4z3CalZrFmTWxbljv/eTQkd+qZ8AAYaAABnuk9idlFXek5Moyz6QrHEXmWcwi/Tt/fuVh6MeI69DqMpReYvByDTKVXqE+UuTPhGBx3qwAAdAABK4baqtdW28KXwv3NGZI0HCbut0cdzzKD2sl+SfbeamgAm2BgrePajqNBJRliVj2rD5+Z2fJbxQcXuV/EbpxeYp7V7cv+5IYB6JOTiF+aAA64AACwABxoAAAncGtlDVdWvlmua9O8gllwaix3K9xWxJpPPeZ147PV2ACCoZbpDfOzXup8o1LCXrzyakzXSDS2x1MtTt/hSSTee83j+mN+KcAF0gAAAABYADJxoB3VVZdLbVByfkWWm4P2PUT/1j9zN1I7J1VwhKyWIRcn4JGl0NP4fTQrfzJZl6ndNFdMdtUIxXkehLWutycAAZaCJxPTPV6KypfNjMfVEsAYWyE65ONkXGS7U1g4NvqNNTqYbb64zXn2r3KXWcAazLSWZ/sn9y2fyT7SuKogel9NunnsurlCXhJHmUYAABZ01TvsUKouUmWum4RCPxaiW5/THsPvAorqrZY5uWM+WC0I61e8WkcV1wriowioxXclg7AJtAAAAAAAAAAA4uqruhsthGcfCSyU2s4BGWZaSex/RLmvzLwHZbPHLJWGvos09rrug4zXcC96TwXVUTx8W5rPkfC+f2nUrOV//Z"
  );

  const { user } = AuthContext();

  const fetchProfile = async () => {
    const storageRef = ref(storage, `user/${user?.email}.png`);

    const url = await getDownloadURL(storageRef);
    setUserPorfilepic(url);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <Router>
      <Header
        // value={setAuthToggal}
        upload={setUploadToggal}
        profileImg={userProfilepic}
        // profileImg={profileImg}
      />
      {UploadToggal === true ? (
        <Uploadmodal value={setUploadToggal} profileImg={userProfilepic} />
      ) : (
        ""
      )}
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoues>
              <Home />
            </ProtectedRoues>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoues>
              <Profile
                profileImg={userProfilepic}
                setprofileImg={setUserPorfilepic}
              />
            </ProtectedRoues>
          }
        />
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/*"
          element={
            <ProtectedRoues>
              <Error />
            </ProtectedRoues>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedRoues>
              <Chats profile={userProfilepic} />
            </ProtectedRoues>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
