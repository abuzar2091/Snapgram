import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";

function SavedPost() {
  const { data: user } = useGetCurrentUser();
  const videoRef = React.useRef(null);
  const { ref, inView } = useInView();

  return (
    <>
      {user?.save.map((posts) => (
        <div key={posts.post.imageId}>
          {/* <img
            src={posts.post.imageUrl}
            className="h-80 rounded-3xl border-gray-700 border-2"
          /> */}
         {posts.post?.imageUrl?.endsWith("admin") ? (
                <div
                  ref={ref}
                  className="h-80 w-60 rounded-3xl border-gray-700 border-2 overflow-hidden mb-10"
                >
                  <ReactPlayer
                    ref={videoRef}
                    url={posts.post?.imageUrl}
                    controls={false}
                    width="100%"
                    height={"100%"}
                    playing={inView} // Automatically plays when in view, pauses when out of view
                    loop // Loops the video when it reaches the end
                    muted={true}
                    className="object-cover"
                  ></ReactPlayer>
                </div>
              ) : (
                <img
                  src={posts.post?.imageUrl|| "/assets/icons/profile-placeholder.svg"}
                  alt="post image"
                  className="h-80 w-60 rounded-3xl border-gray-700 border-2"
                />
              )}




        </div>
      ))}
    </>
  );
}

{
  /* <Link to='/' className="grid-post_link">
      <img
        src={post.imageUrl}
        alt="post"
        className="h-full w-full object-cover"
      />
    </Link>
     <div className="grid-post_user">
  
       <div className="flex items-center justify-start gap-2 flex-1">
         <Link to={`/profile/${user.id}`}>
         <img
           src={
             post.creator.imageUrl ||
             "/assets/icons/profile-placeholder.svg"
           }
           alt="creator"
           className="w-8 h-8 rounded-full"
         />
         </Link>
         <p className="line-clamp-1">{post.creator.name}</p>
       </div>
  
      <PostStats post={post} userId={user.id} />
   </div> */
}

export default SavedPost;
