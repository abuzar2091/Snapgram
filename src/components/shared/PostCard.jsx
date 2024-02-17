import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import CommentSection from "./CommentSection";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";
function PostCard({ post }) {
  if (!post.creator) return;
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const videoRef = React.useRef(null);
  const { ref, inView } = useInView();
  // useEffect(() => {
  //   if (videoRef.current) {
  //     if (!inView) {
  //       // Pause the video when out of view
  //       videoRef.current.getInternalPlayer().pause();
  //     } else {
  //       // Play the video when in view
  //       videoRef.current.getInternalPlayer().play();
  //     }
  //   }
  // }, [inView]);
  const [isMuted, setIsMuted] = useState(false);
  const handleVideoEnd = (e) => {
    e.target.play(); // Restart the video
  };
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>

              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag, index) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        {post?.imageUrl.endsWith("admin") ? (
          <div ref={ref} className="relative">
            <ReactPlayer
              ref={videoRef}
              url={post.imageUrl}
              controls={false}
              width="100%"
              playing={inView} // Automatically plays when in view, pauses when out of view
              loop // Loops the video when it reaches the end
              //   muted={!inView}
              muted={isMuted}
              // Mutes when out of view
              onEnded={handleVideoEnd}
              className="relative"
            ></ReactPlayer>
            <Link to={`${pathname}`}>
              <Button
                className="right-[120px] bottom-1 absolute"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <img
                    src={"/assets/icons/volume-off.svg"}
                    alt="volumeimg"
                    width={12}
                    height={20}
                  />
                ) : (
                  <img
                    src={"/assets/icons/volume-high-solid.svg"}
                    alt="volumeimg"
                    width={20}
                    height={20}
                  />
                )}
              </Button>
            </Link>
          </div>
        ) : (
          <img
            src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="post image"
            className="post-card_img"
          />
        )}
       
      </Link>
      <PostStats post={post} userId={user.id}  showLikeComment={true} />
    
      <div className="mt-4">
        <CommentSection postId={post.$id} post={post} />
      </div>
    </div>
  );
}

export default PostCard;
