import React, { useEffect, useState } from "react";
import Post from "./Post";
import Stories from "./Stories";
import { storiesData, posts } from "./Firebase";
import { getDocs } from "firebase/firestore";

export default function Home() {
  const [stories, setstories] = useState([]);
  const [postdata, setpostdata] = useState([]);

  useEffect(() => {
    // code
    getdata();
    getstories();
  }, []);

  const getstories = async () => {
    try {
      const data = await getDocs(storiesData);
      let udata = data.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
      setstories(udata);
    } catch (error) {
      console.log(error);
    }
  };

  const getdata = async () => {
    const data = await getDocs(posts);
    let udata = data.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
    setpostdata(udata);
  };

  return (
    <>
      <div className="container">
        {/* header  */}

        {/* <Profile /> */}
        {/* stories */}
        <div className="stories_center">
          <div className="stories_container border">
            {stories.map(({ data, id }) => {
              return (
                <Stories
                  username={data.username}
                  avatar={data.avatar}
                  key={id}
                />
              );
            })}
          </div>
        </div>

        {/* posts */}
        {postdata.map(({ data, id }) => {
          return (
            <Post
              avatar={data.avatar}
              username={data.uid}
              post={data.post}
              caption={data.caption}
              key={id}
            />
          );
        })}
      </div>
    </>
  );
}
