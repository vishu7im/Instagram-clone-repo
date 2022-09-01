import React, { useState, useEffect } from "react";

export default function Recive({ msg, username, timestamp, avatar }) {
  const [time, setTime] = useState("time");

  useEffect(() => {
    let date = new Date(timestamp.seconds);
    let R = date.getHours() + ":" + date.getMinutes();
    setTime(R.toString());
  }, [timestamp]);
  return (
    <>
      <div className="Recive">
        <div className="img_cont_msg">
          <img src={avatar} class="rounded-circle user_img_msg" />
        </div>
        <div>
          <div className="msg_cotainer">{msg}</div>
          <span className="Chat_user">{username + " : " + time}</span>
        </div>
      </div>
    </>
  );
}
