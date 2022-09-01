import React from "react";
import ChatBOX from "./ChatBOX";
import "./Chats.css";

export default function Chats({ profile }) {
  return (
    <div className="chat_container border">
      <div className="chat_box">
        <ChatBOX profile={profile} />
      </div>
    </div>
  );
}
