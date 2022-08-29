import { Avatar } from "@mui/material";
import React from "react";

export default function Stories({ username, avatar }) {
  return (
    <>
      <div className="stories_avatar">
        <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 60, height: 60 }} />
        <p>{username}</p>
      </div>
    </>
  );
}
