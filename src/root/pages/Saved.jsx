import GridPostList from "@/components/shared/GridPostList";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetCurrentUser,
  useGetPosts,
  useGetSavedPosts,
} from "@/lib/react-query/queriesAndMutation";
import React, { useEffect } from "react";
import SavedPost from "./SavedPost";

function Saved() {

  return (
    <div className="h-full mt-8 md:block hidden ">
      <div className="flex gap-3">
        <img src="/assets/icons/save.svg" />
        <span className="text-2xl text-white">Saved Posts</span>
      </div>
      <div className="flex gap-24 mt-12 ml-20">
        <div className="flex  items-center gap-3">
          <img src="/assets/icons/posts.svg" />
          <span>Posts</span>
        </div>
        <div className="flex  items-center gap-3">
          <img src="/assets/icons/posts.svg" />
          <span>Reels</span>
        </div>
        <div className="flex items-center gap-3">
          <img src="/assets/icons/posts.svg" />
          <span>Collection</span>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-20 mr-10">
        <SavedPost />
      </div>
    </div>
  );
}

export default Saved;
