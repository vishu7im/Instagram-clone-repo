import { Avatar } from "@mui/material";

import React from "react";
import {
  BookmarkBorderOutlined,
  CommentBankOutlined,
  EmojiEmotions,
  FavoriteBorderOutlined,
  NearMeOutlined,
  PostAdd,
} from "@mui/icons-material";

export default function Post({ avatar, username, caption, post }) {
  return (
    <>
      <div className="post_container">
        <div className="post_box border">
          <div className="post_header">
            <Avatar alt="Remy Sharp" src={avatar} />
            <h1>{username}</h1>
          </div>

          <img className="post_img" src={post} alt="this is a post " />
          <div className="post_like">
            <div className="post_like_sec">
              <div className="icon">
                <FavoriteBorderOutlined color="success" />
              </div>
              <div className="icon">
                <CommentBankOutlined />
              </div>
              <div className="icon">
                <NearMeOutlined />
              </div>
            </div>
            <div className="post_like_save">
              <div className="icon">
                <BookmarkBorderOutlined />
              </div>
            </div>
          </div>
          <div className="post_like_count">
            <h1>411 LIKE</h1>
          </div>
          <div className="post_caption">
            <strong>{username} : </strong>
            <span>{caption}</span>
          </div>
          <div className="post_view_comment">
            <p>Show all comment......</p>
          </div>

          <div className="post_comment">
            <div>
              <EmojiEmotions />
            </div>
            <div className="post_comment_input">
              <input
                type="text"
                id="comment_input"
                placeholder="Add your comment"
              />
            </div>

            <div>
              <PostAdd />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
