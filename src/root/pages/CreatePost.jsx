import PostForm from "@/components/forms/PostForm";
import React from "react";

function CreatePost() {
  return (
    <div className="flex flex-1">
      <div className="comman-container">
        <div
          className="max-w-5xl flex-start gap-3 justify-center
    w-full"
        >
          <img
            src="/assets/icons/add-post.svg"
            height={36}
            width={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">CreatePost</h2>
        </div>
        <PostForm action="Create" />
      </div>
    </div>
  );
}

export default CreatePost;
