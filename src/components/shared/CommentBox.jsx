import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "./Loader";

function CommentBox({ onCommentSubmit, isPending }) {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(commentText);
    // console.log(commentText);
    setCommentText("");
  };
  return (
    <form onSubmit={handleCommentSubmit}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          className="shad-input"
          //  placeholder="Add a Comment..."
          value={commentText}
          onChange={handleCommentChange}
          placeholder={isPending ?"Posting...": "Add a Comment..."}
        />
        <Button className="hover:bg-gray-600 " type="submit">
          Post
        </Button>
      </div>
    </form>
  );
}

export default CommentBox;
