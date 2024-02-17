import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import React from "react";

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
 
}) => {
  const { user } = useUserContext();
  const { ref, inView } = useInView();
  const videoRef = React.useRef(null);
  //console.log(isPosts);

  return (
    <ul className="grid-container">
      {posts &&
        posts.map((post) => (
          <li key={post.$id} className=" relative min-w-80 h-80">
            <Link to={`/posts/${post.$id}`} className="grid-post_link">
              {post?.imageUrl?.endsWith("admin") ? (
                <div
                  ref={ref}
                  className="h-80 w-60 rounded-3xl border-gray-700 border-2 overflow-hidden mb-10"
                >
                  <ReactPlayer
                    ref={videoRef}
                    url={post?.imageUrl}
                    controls={false}
                    width="100%"
                    height={"100%"}
                    playing={inView} // Automatically plays when in view, pauses when out of view
                    loop // Loops the video when it reaches the end
                    muted={true}
                    className="object-cover"
                  />
                </div>
              ) : (
                <>
                  (
                  <img
                    src={
                      post?.imageUrl || "/assets/icons/profile-placeholder.svg"
                    }
                    alt="post image"
                    className="h-80 w-60 rounded-3xl border-gray-700 border-2"
                  />
                  )
                </>
              )}
            </Link>

            <div className="grid-post_user">
              {showUser && (
                <div className="flex items-center justify-start gap-2 flex-1">
                  <Link to={`/profile/${user.id}`}>
                    <img
                      src={
                        post?.creator?.imageUrl ||
                        "/assets/icons/profile-placeholder.svg"
                      }
                      alt="creator"
                      className="w-8 h-8 rounded-full"
                    />
                  </Link>
                  <p className="line-clamp-1">{post?.creator?.name}</p>
                </div>
              )}
              {showStats && (
                <PostStats
                  post={post}
                  userId={user.id}
                  showLikeComment={false}
                />
              )}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default GridPostList;
