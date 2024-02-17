import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
function PostDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const { mutateAsync: deletePost } = useDeletePost();

  const { data: post, isPending } = useGetPostById(id || "");

  const handleDeletePost = async() => {
    console.log("i am inside to delete");
    await deletePost({ postId: id, imageId: post?.imageId });
    navigate("/");
    // console.log("delete successfully");
    // console.log(deletedPost);
    // if (!deletedPost) {
    //   console.log("failed delete");
    //   return toast({ title: "please try again" });
    // }
    // console.log("delete successfully");
    // console.log(deletedPost);
  };

  const videoRef = React.useRef(null);
  const { ref, inView } = useInView();
  const [isMuted, setIsMuted] = useState(false);
  const handleVideoEnd = (e) => {
    e.target.play(); // Restart the video
  };
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          {post?.imageUrl.endsWith("admin") ? (
            <div ref={ref} className="relative post_details-img">
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
                // className="relative"
              ></ReactPlayer>
              <Button
                className="right-[30px] bottom-[100px] absolute"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <img
                    src={"/assets/icons/volume-off.svg"}
                    alt="volumeimg"
                    width={10}
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
            </div>
          ) : (
            <img
              src={post?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="post image"
              className="post_details-img"
            />
          )}

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
              </Link>
              <div className="flex gap-1 flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                  {post?.creator.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular ">
                    {multiFormatDateString(post?.$createdAt)}
                  </p>

                  <p className="subtle-semibold lg:small-regular">
                    {post?.location}
                  </p>
                </div>
              </div>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  // {...isDeletingPost ? (<Loader/>):<>
                  // </>}
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag, index) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
// import React from 'react'

// function PostDetails() {
//   return (
//     <div>PostDetails</div>
//   )
// }

// export default PostDetails
