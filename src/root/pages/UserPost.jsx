import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { Link, useLocation } from "react-router-dom";

function UserPost({ user, isPosts }) {
  const videoRef = React.useRef(null);
  const { ref, inView } = useInView();
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col">
  
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-20 ml-20 mr-10 ">
        {user?.posts.map((posts) => (
          <div key={posts.imageId}>
            {posts?.imageUrl.endsWith("admin") ? (
              <div
                ref={ref}
                className="h-80 w-60 rounded-3xl border-gray-700 border-2 overflow-hidden mb-10"
              >
                <ReactPlayer
                  ref={videoRef}
                  url={posts.imageUrl}
                  controls={false}
                  width="100%"
                  height={"100%"}
                  playing={inView} // Automatically plays when in view, pauses when out of view
                  loop // Loops the video when it reaches the end
        
                  muted={true}
                  className=" object-cover"
                  // Mutes when out of view
                ></ReactPlayer>
              </div>
            ) : (
              <> {isPosts &&
              <img
                src={posts.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="post image"
                className="h-80 w-60 rounded-3xl border-gray-700 border-2"
              />}
              </>
            )}
            {/* <img
              src={posts.imageUrl}
              className="h-80 w-60 rounded-3xl border-gray-700 border-2"
            /> */}
          </div>
          // console.log(posts.imageUrl)
        ))}
      </div>
    </div>
  );
}

export default UserPost;
