// import {
//   useDeleteSavedPost,
//   useGetCurrentUser,
//   useGetPostById,
//   useLikePost,
//   useSavePost,
// } from "@/lib/react-query/queriesAndMutation";
// import { checkIsLiked } from "@/lib/utils";
// import React, { useEffect, useState } from "react";
// import Loader from "./Loader";
// import CommentPage from "./CommentPage";
// import { Button } from "../ui/button";

// function PostStats({ post: initialpost, userId }) {
//   const [post, setPost] = useState(initialpost);
//   const likesList = post?.likes.map((user) => user.$id);

//   const [likes, setLikes] = useState(likesList);
//   const [isSaved, setIsSaved] = useState(false);

//   const { mutateAsync: likePost } = useLikePost();
//   const { mutate: savePost, isPending: isSavingPost } = useSavePost();
//   const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
//     useDeleteSavedPost();
//   // const { user } = useUserContext();
//   const {
//     data: updatedPost,
//     isLoading: isPostLoading,
//     isError: isPostError,
//     refetch,
//   } = useGetPostById(post.$id);

//   const { data: currentUser } = useGetCurrentUser();
//   const savedPostRecord = currentUser?.save.find(
//     (record) => record.post.$id === post.$id
//   );
//   useEffect(() => {
//     setIsSaved(!!savedPostRecord);
//   }, [currentUser]);

//   const handleLikePost = async(e) => {
//     e.stopPropagation();

//     let likesArray = [...likes];

//     if (likesArray.includes(userId)) {
//       likesArray = likesArray.filter((Id) => Id !== userId);
//     } else {
//       likesArray.push(userId);
//     }
//     setLikes(likesArray);

//     await likePost({ postId: post.$id, likesArray });
//     refetch();
//     // setRenders(true);
//   };

//   useEffect(() => {
//     if (!isPostLoading && !isPostError && updatedPost) {
//       setPost(updatedPost);

//     }
//   }, [isPostLoading, isPostError, updatedPost]);

//   const handleSavePost = (e) => {
//     e.stopPropagation();
//     if (savedPostRecord) {
//       setIsSaved(false);
//       //  console.log({savedPostRecord});
//       console.log(savedPostRecord.$id);

//       return deleteSavedPost(savedPostRecord.$id);
//     }
//     savePost({ userId: userId, postId: post.$id });
//     setIsSaved(true);
//   };
//   // console.log(post);
//   return (
//     <>
//       <div className={`flex justify-between items-center z-20 `}>
//         <div className="flex gap-2 mr-5">
//           <img
//             src={`${
//               checkIsLiked(likes, userId)
//                 ? "/assets/icons/liked.svg"
//                 : "/assets/icons/like.svg"
//             }`}
//             alt="like"
//             width={20}
//             height={20}
//             onClick={(e) => handleLikePost(e)}
//             className="cursor-pointer pt-0"
//           />
//           <p className="small-medium lg:base-medium mt-3">{likes.length}</p>
//           <div>
//             <CommentPage postId={post?.$id} msg={""} />
//           </div>
//         </div>

//         <div className="flex gap-2">
//           {isSavingPost || isDeletingSavedPost ? (
//             <Loader />
//           ) : (
//             <img
//               src={
//                 isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
//               }
//               alt="share"
//               width={20}
//               height={20}
//               className="cursor-pointer"
//               onClick={(e) => handleSavePost(e)}
//             />
//           )}
//         </div>
//       </div>

//       {post?.likes?.length > 1 ? (
//         <p className="text-gray-400 font-bold text-sm">
//           Liked by {post.likes[post.likes.length - 1].name} and{" "}
//           {post.likes.length - 1} others
//         </p>
//       ) : post?.likes?.length == 1 ? (
//         <p className="text-gray-400 font-bold text-sm">
//           Liked by {post.likes[post.likes.length - 1].name}{" "}
//         </p>
//       ) : (
//         ""
//       )}
//       {post?.comment?.length === 0 ? (
//         ""
//       ) : (
//         // <Button className="pl-0" >
//         <div>
//           <CommentPage
//             postId={post?.$id}
//             msg={
//               post?.comment?.length > 1 ? (
//                 <p className="font-bold text-[14px]">
//                   View all {post.comment.length} comments
//                 </p>
//               ) : post?.comment?.length > 0 ? (
//                 <p className="font-bold text-[14px]">
//                   View {post.comment.length} comment
//                 </p>
//               ) : (
//                 ""
//               )
//             }
//           />
//         </div>
//         // <CommentPage msg=

//         //   {post?.comment?.length > 1 ? (
//         //     <p className="font-bold text-[14px]">
//         //       View all {post.comment.length} comments
//         //     </p>
//         //   ) : post?.comment?.length > 0 ? (
//         //     <p className="font-bold text-[14px]">
//         //       View {post.comment.length} comment
//         //     </p>
//         //   ) : (
//         //     ""
//         //     )
//         //   }
//         // >
//         // sdjkf
//         //     </CommentPage>
//       )}
//     </>
//   );
// }

// export default PostStats;
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useGetPostById,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutation";
import { checkIsLiked } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import CommentPage from "./CommentPage";
import { Button } from "../ui/button";
import LikeComment from "./LikeComment";

function PostStats({ post: initialpost, userId, showLikeComment = true }) {
  const [post, setPost] = useState(initialpost);
  const likesList = post?.likes.map((user) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutateAsync: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();
  const {
    data: updatedPost,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostById(post.$id);

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = async (e) => {
    e.stopPropagation();

    let likesArray = [...likes];
    const isLiked = likesArray.includes(userId);

    if (isLiked) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);

    try {
      // Optimistically update the UI without waiting for the server response
      setPost((prevPost) => ({
        ...prevPost,
        likes: likesArray.map((id) => ({ $id: id })),
      }));

      await likePost({ postId: post.$id, likesArray });
    } catch (error) {
      console.error("Error liking post:", error);
      setLikes([...likes]); // Reset the local state if the operation fails
    }
  };

  useEffect(() => {
    if (!isPostLoading && !isPostError && updatedPost) {
      setPost(updatedPost);
    }
  }, [isPostLoading, isPostError, updatedPost]);

  const handleSavePost = (e) => {
    e.stopPropagation();
    if (savedPostRecord) {
      setIsSaved(false);
      console.log(savedPostRecord.$id);
      return deleteSavedPost(savedPostRecord.$id);
    }
    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  return (
    <>
      <div className={`flex justify-between items-center z-20 `}>
        <div className="flex gap-2 mr-5">
          <img
            src={`${
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }`}
            alt="like"
            width={20}
            height={20}
            onClick={(e) => handleLikePost(e)}
            className="cursor-pointer pt-0"
          />
          <p className="small-medium lg:base-medium mt-3">{likes.length}</p>
          {showLikeComment && (
            <div>
              <CommentPage postId={post?.$id} msg={""} />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {isSavingPost || isDeletingSavedPost ? (
            <Loader />
          ) : (
            <img
              src={
                isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
              }
              alt="share"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={(e) => handleSavePost(e)}
            />
          )}
        </div>
      </div>
      {showLikeComment && <LikeComment posts={post} />}

      {/* {
       
      post?.likes?.length > 1 ? (
        <p className="text-gray-400 font-bold text-sm">
          Liked by {post.likes[post.likes.length - 1].name} and{" "}
          {post.likes.length - 1} others
        </p>
      ) : post?.likes?.length == 1 ? (
        <p className="text-gray-400 font-bold text-sm">
          Liked by {post.likes[post.likes.length - 1].name}{" "}
        </p>
      ) : (
        ""
      )}
      */}
      {
        showLikeComment && <div>

       
      
      {  post?.comment?.length === 0 ? (
        ""
      ) : (
        <div>
          <CommentPage
            postId={post?.$id}
            msg={
              post?.comment?.length > 1 ? (
                <p className="font-bold text-[14px]">
                  View all {post.comment.length} comments
                </p>
              ) : post?.comment?.length > 0 ? (
                <p className="font-bold text-[14px]">
                  View {post.comment.length} comment
                </p>
              ) : (
                ""
              )
            }
          />
        </div>
      )} 
       </div>}
    </>
  );
}

export default PostStats;
