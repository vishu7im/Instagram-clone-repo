import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { posts } from "./Firebase";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function UserProfileCard({ post, index, func }) {
  const [UserDelete, setUserDelete] = useState(false);

  const DeletePost = async () => {
    console.log("i am delet and index is " + index);
    const data = doc(posts, index);
    const delet = await deleteDoc(data);

    console.log(data + delet);
    func();
  };

  return (
    <>
      <div className="User_Profile_box border">
        {UserDelete === true ? (
          <div className="User_Delete border">
            <div>
              <button onClick={DeletePost}>delete</button>
              <button
                className="btn_green"
                onClick={() => {
                  setUserDelete(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="User_menu">
              <DeleteForeverIcon
                onClick={() => {
                  setUserDelete(true);
                }}
              />
            </div>

            <div className="UserProfileIMgBOX">
              <img
                className="User_Profile_img"
                src={post}
                alt="this is a post "
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
