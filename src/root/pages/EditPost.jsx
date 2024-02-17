import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import React from "react";
import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  if (isPending) return <Loader/>;
  return (
    <div className="flex flex-1">
      <div className="comman-container">
        <div
          className="max-w-5xl flex-start gap-3 justify-start
      w-full"
        >
          <img
            src="/assets/icons/add-post.svg"
            height={36}
            width={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
}

export default EditPost;
