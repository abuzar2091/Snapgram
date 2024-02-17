import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetCurrentUserById,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
function TagPost({ postId, userId }) {
  const navigate = useNavigate();
  //   const { id } = useParams();
  //   const { user } = useUserContext();
  console.log("inside tag post");
  //   console.log(id);
  const { mutateAsync: deletePost } = useDeletePost();

  const { data: posts, isPending } = useGetPostById(postId || "");
  const { data: user, isPending: isUserById } = useGetCurrentUserById(userId);
  console.log(user);
  //   const handleDeletePost = async () => {
  //     console.log("i am inside to delete");
  //     await deletePost({ postId: id, imageId: post?.imageId });
  //     navigate("/");
  //   };

  const videoRef = React.useRef(null);
  const { ref, inView } = useInView();
  //const [isMuted, setIsMuted] = useState(false);
  const handleVideoEnd = (e) => {
    e.target.play(); // Restart the video
  };
  //   const toggleMute = () => {
  //     setIsMuted((prev) => !prev);
  //   };
  return (
    <div className=" relative">
      {isPending ? (
        <Loader />
      ) : (
        <div className="">
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
                <p className="absolute bottom-2 left-2 text-white font-bold text-xl">
                {/* {posts.creator.name} */}
                    <Link to={`/profile/${user?.$id}`}>
                <div className="flex gap-2 cursor-pointer">
                  <img
                    src={user?.imageUrl}
                    alt="img"
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                  <p className=" text-lg text-gray-500"> {user?.name}</p>
                </div>
                </Link>
              </p>
            </div>
          ) : (
            <div className="h-80 w-52 rounded-3xl border-gray-700 border-2 overflow-hidden mb-10 relative">
              <img
                src={posts?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="post image"
                className="w-full h-full object-cover rounded-3xl"
              />
              <p className="absolute bottom-2 left-2 text-white font-bold text-xl">
                {/* {posts.creator.name} */}
                    <Link to={`/profile/${user?.$id}`}>
                <div className="flex gap-2 cursor-pointer">
                  <img
                    src={user?.imageUrl}
                    alt="img"
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                  <p className=" text-lg text-gray-500"> {user?.name}</p>
                </div>
                </Link>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TagPost;
