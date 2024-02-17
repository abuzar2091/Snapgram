import React from "react";
import CommentPage from "./CommentPage";

function LikeComment({posts}) {

  return (
   
    
    <div>
        
      {posts?.likes?.length > 1 ? (
        <p className="text-gray-400 font-bold text-sm">
          Liked by {posts.likes[posts.likes.length - 1].name} and{" "}
          {posts.likes.length - 1} others
        </p>
      ) : posts?.likes?.length == 1 ? (
        <p className="text-gray-400 font-bold text-sm">
          Liked by {posts.likes[posts.likes.length - 1].name}{" "}
        </p>
      ) : (
        ""
      )}
      {posts?.comment?.length === 0 ? (
        ""
      ) : (
        <div>
          <CommentPage
            postsId={posts?.$id}
            msg={
              posts?.comment?.length > 1 ? (
                <p className="font-bold text-[14px]">
                  View all {posts.comment.length} comments
                </p>
              ) : posts?.comment?.length > 0 ? (
                <p className="font-bold text-[14px]">
                  View {posts.comment.length} comment
                </p>
              ) : (
                ""
              )
            }
          />
        </div>
      )}
    </div>
       
  );
}

export default LikeComment;
