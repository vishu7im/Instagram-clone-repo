import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import { storage, posts } from "./Firebase";
import { getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import UserProfileCard from "./UserProfileCard";

// import { addDoc } from "firebase/firestore";

function Profile({ profileImg, setprofileImg }) {
  const [cardData, setCardData] = useState([]);
  const { user, logout } = AuthContext();
  const [progress, setprogress] = useState(0);
  const [updateToggal, setupdateToggal] = useState(false);
  const [loadder, setloadder] = useState(false);
  const [img, setimg] = useState(null);

  let loginNavigate = useNavigate();

  const UpdateUserProfile = () => {
    setloadder(true);
    const storageRef = ref(storage, `user/${user.email}.png`);

    const UploadTask = uploadBytesResumable(storageRef, img);

    UploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setprogress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        fetchProfile();
      }
    );
  };
  const getCardData = async () => {
    const data = await getDocs(posts);
    let udata = data.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
    setCardData(udata);
    console.log(cardData);
  };

  useEffect(() => {
    getCardData();
  }, []);
  const fetchProfile = async () => {
    const storageRef = ref(storage, `user/${user.email}.png`);

    const url = await getDownloadURL(storageRef);
    setprofileImg(url);
    setprogress(0);
    setloadder(false);
    setupdateToggal(false);
  };
  // code for user logout

  const handaleOnchange = (e) => {
    if (e.target.files[0]) {
      setimg(e.target.files[0]);
    }
  };

  const Logout = async () => {
    try {
      let data = await logout();
      console.log(data);
    } catch (error) {
      alert(error.message);
    }

    loginNavigate("/login");
    // alert("user log out ");
  };
  return (
    <>
      <div className="profile_contaner">
        <div className="profile_section">
          {updateToggal === true ? (
            <div className="profile_box">
              <div className="update_profile">
                <input type="file" onChange={handaleOnchange} />
                <Avatar
                  alt="Remy Sharp"
                  src={profileImg}
                  sx={{ width: 60, height: 60 }}
                />
              </div>

              <div className="progress_bar">
                <progress value={progress} max="100" className="bar"></progress>
              </div>

              <div className="clearfix">
                <button
                  type="submit"
                  className="cancelbtn"
                  onClick={() => {
                    setupdateToggal(false);
                  }}
                >
                  cancel
                </button>
                <button
                  disabled={loadder || !img}
                  type="button"
                  className="signupbtn"
                  onClick={() => {
                    UpdateUserProfile();
                  }}
                >
                  save
                </button>
              </div>
            </div>
          ) : (
            <div className="profile_box">
              <div className="profile_avatar">
                <Avatar
                  alt="Remy Sharp"
                  src={profileImg}
                  sx={{ width: 60, height: 60 }}
                />
              </div>
              <div className="profile_username">
                <h1>{user?.email}</h1>
              </div>
              <div className="clearfix">
                <button
                  type="button"
                  className="signupbtn"
                  onClick={() => {
                    setupdateToggal(true);
                  }}
                >
                  Update
                </button>
                <button type="submit" className="cancelbtn" onClick={Logout}>
                  logout
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="ProfileCard">
          {cardData.map(({ data, id }, i) => {
            return data.uid === user.email ? (
              <UserProfileCard
                func={getCardData}
                avatar={data.avatar}
                post={data.post}
                username={data.username}
                index={id}
              />
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Profile;
