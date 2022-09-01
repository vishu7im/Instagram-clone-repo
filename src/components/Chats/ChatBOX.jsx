import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Send from "./Send";
import Recive from "./Recive";
import {
  serverTimestamp,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { msg } from "../Firebase";
import { AuthContext } from "../../Context/UserContext";

export default function ChatBOX({ profile }) {
  const [msgInput, setmsgInput] = useState("");
  const [TextMsg, setTextMsg] = useState([]);
  const { user } = AuthContext();

  useEffect(() => {
    const q = query(msg, orderBy("timestamp"));
    const data = onSnapshot(q, (snap) => {
      let msg = [];
      snap.forEach((doc) => {
        msg.push(doc.data());
      });
      setTextMsg(msg);
    });
  }, [TextMsg]);

  const SendMsg = async (e) => {
    e.preventDefault();
    if (!msgInput) {
      alert("fill the data ");
      return;
    }
    try {
      let data = addDoc(msg, {
        msg: msgInput,
        username: user.displayName,
        timestamp: serverTimestamp(),
        uid: user.uid,
        avatar: profile,
      });
    } catch (error) {
      alert(error.message);
    }
    console.log(TextMsg);
    setmsgInput("");
    console.log("msg send ");
  };
  return (
    <>
      <div className="chatbox_heading">
        <div className="User_Box border ">
          <strong>Message</strong>
        </div>

        <div className="Chat_Area">
          <div className="mesgs">
            {TextMsg.map((data, i) => {
              if (user.uid === data.uid) {
                return (
                  <Send
                    msg={data.msg}
                    timestamp={data.timestamp}
                    avatar={data.avatar}
                    key={i}
                  />
                );
              } else {
                return (
                  <Recive
                    key={i}
                    msg={data.msg}
                    username={data.username}
                    timestamp={data.timestamp}
                    avatar={data.avatar}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="SendMessage">
          <div className="input-ig">
            <input
              type="text"
              className="msgFeild"
              value={msgInput}
              onChange={(e) => {
                setmsgInput(e.target.value);
              }}
              placeholder="message....."
            />
          </div>
          <div className="iconIG">
            <button onClick={SendMsg}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
