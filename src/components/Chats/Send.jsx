import React, { useState, useEffect } from "react";

export default function Send({ msg, timestamp, avatar }) {
  const [time, setTime] = useState("time");

  useEffect(() => {
    let date = new Date(timestamp?.seconds);
    let R = date.getHours() + ":" + date.getMinutes();
    setTime(R.toString());
  }, [timestamp]);
  return (
    <>
      <div className="Send">
        <div>
          <div className="msg_cotainer_send">{msg}</div>
          <div className="send_time">
            <span className="Chat_user ">{"You : " + time}</span>
          </div>
        </div>
        <div className="img_cont_msg">
          <img src={avatar} className="rounded-circle user_img_msg" />
        </div>
      </div>
    </>
  );
}
