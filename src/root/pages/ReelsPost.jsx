import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

import PostStats from "@/components/shared/PostStats";
import React from "react";

const ReelsPost = ({ posts }) => {
  const { user } = useUserContext();
  const { ref, inView } = useInView();
  const videoRef = React.useRef(null);

  return (
    // <div className="grid-container">
    //   {posts &&
    //     posts.map((post) => (
    //       <div key={post.$id} className="grid grid-cols-3">
    //         <Link to={`/posts/${post.$id}`} className="">
    //           {post?.imageUrl?.endsWith("admin") && (
    //             <div
    //               ref={ref}
    //               className="h-80 w-60 rounded-3xl border-gray-700 border-2 overflow-hidden"
    //             >
    //               <ReactPlayer
    //                 ref={videoRef}
    //                 url={post?.imageUrl}
    //                 controls={false}
    //                 width="100%"
    //                 height={"100%"}
    //                 playing={inView} // Automatically plays when in view, pauses when out of view
    //                 loop // Loops the video when it reaches the end
    //                 muted={true}
    //                 className="object-cover"
    //               />
    //             </div>
    //           )}
    //         </Link>

    //         {/* <div className="grid-post_user">
    //           <div className="flex items-center justify-start gap-2 flex-1">
    //             <Link to={`/profile/${user.id}`}>
    //               <img
    //                 src={
    //                   post.creator?.imageUrl ||
    //                   "/assets/icons/profile-placeholder.svg"
    //                 }
    //                 alt="creator"
    //                 className="w-8 h-8 rounded-full"
    //               />
    //             </Link>
    //             <p className="line-clamp-1">{post.creator?.name}</p>
    //           </div>

    //           <PostStats post={post} userId={user.id} showLikeComment={false} />
    //         </div> */}
    //       </div>
    //     ))}
    // </div>
    <div className="explore-container">
      {posts &&
        posts.map((post) => (
          <div className=" grid grid-cols-3 relative">
            <Link to={`/posts/${post.$id}`} className="">
              {post?.imageUrl?.endsWith("admin") && (
                <div
                  ref={ref}
                  key={post.$id}
                  className="h-80 w-60 rounded-3xl border-gray-700 border-2 overflow-hidden"
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
                  <Link to={`/profile/${user.id}`}>
                    <div className="flex items-center justify-start gap-2  flex-1 absolute bottom-2 left-4">
                      <img
                        src={
                          post.creator?.imageUrl ||
                          "/assets/icons/profile-placeholder.svg"
                        }
                        alt="creator"
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="line-clamp-1">{post.creator?.name}</p>
                    </div>
                  </Link>
                </div>
              )}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ReelsPost;
