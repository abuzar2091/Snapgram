import React, { useEffect, useState } from "react";
import { ID } from "appwrite";

import {
  useGetCurrentUser,
  useGetPostById,
  useSaveComment,
} from "@/lib/react-query/queriesAndMutation";
import CommentPage from "./CommentPage";
import CommentBox from "./CommentBox";

function CommentSection({ postId, post: initialpost }) {
  const { mutateAsync: saveComment, isPending: isSavingPost } =
    useSaveComment();
  const {
    data: updatedPost,
    isLoading: isPostLoading,
    isError: isPostError,
    refetch,
  } = useGetPostById(postId);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(initialpost);
  const { data: user } = useGetCurrentUser();

  //  console.log(post);
  const handleCommentSubmit = async (commentText) => {
    try {

      // future updation k liye
    //  const uniqueId=post.comment.filter((data)=>{
    //     if(data.user.$id===user.$id){
    //       return data.$id;
    //     }
    //   })
    // uniqueId:uniqueId?uniqueId:ID.unique()
      await saveComment({
        comment: [commentText,...comments],
        userId: user.$id,
        postId: postId,
      });
      refetch();

      setComments((prevComments) => [...prevComments, commentText]);

      console.log("saved comment");
      console.log(post);
      console.log(user);

      // Place your additional code here, as it will run after saveComment has completed.
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    if (!isPostLoading && !isPostError && updatedPost) {
      setPost(updatedPost);
     // console.log(updatedPost);
    }
  }, [isPostLoading, isPostError, updatedPost]);

  return (
    <div>
      <CommentBox
        onCommentSubmit={handleCommentSubmit}
        isPending={isSavingPost}
      />
    </div>
  );
}
export default CommentSection;
