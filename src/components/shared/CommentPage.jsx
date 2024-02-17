import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import { Link } from "react-router-dom";
import { commentmultiFormatDateString } from "@/lib/utils";


function CommentPage({ postId, msg }) {
  if (!postId) return;
  //console.log(postId);

  const { data: post, Pending } = useGetPostById(postId || "");
  const [likes, setLikes] = useState({});

  const handleLikePost = (cIds) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [cIds]: !prevLikes[cIds],
    }));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col ">
          {msg === "" ? (
            <img
              src="/assets/icons/comment-regular.svg"
              width={22}
              height={22}
              className="ml-5 bg-slate-50 cursor-pointer mt-4"
            />
          ) : (
            msg
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className=" w-59 p-0">
        <ScrollArea className="h-72 w-60 rounded-md border bg-black">
          <div className="p-8">
            {/* <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4> */}
            {post?.comment?.length == 0 ? (
              <>
                <p className="text-lg ">No Comment Yet...</p>
                <p className=" text-gray-400">start conversation</p>
              </>
            ) : (
              post?.comment
                ?.slice()
                .reverse()
                .map((data) => (
                  <div className="mb-5">
                    <div className="flex gap-3">
                      <Link
                        to={`profile/${data.user.$id}`}
                        className="flex-shrink-0"
                      >
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img
                            src={data.user.imageUrl}
                            className="h-full w-full object-cover"
                            alt={`${data.user.name}'s profile`}
                          />
                        </div>
                      </Link>

                      <div className="flex flex-col gap-0 pr-0">
                        <Link to={`profile/${data.user.$id}`}>
                          <p className="text-sm font-bold overflow-ellipsis">
                            {data.user.name}
                          </p>
                        </Link>
                        <div
                          key={data.comment[0]}
                          className="text-sm text-gray-400 overflow-ellipsis"
                        >
                          {data.comment[0]}
                        </div>
                      </div>
                      <div className="text-sm">
                        {commentmultiFormatDateString(data.$createdAt)}
                      </div>
                      <div className="w-1/4 ml-4">
                        <img
                          src={`${
                            likes[data.comment[0]]
                              ? "/assets/icons/liked.svg"
                              : "/assets/icons/like.svg"
                          }`}
                          alt="like"
                          width={15}
                          height={15}
                          onClick={() => handleLikePost(data.comment[0])}
                          className="cursor-pointer mt-1 ml-auto "
                        />
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export default CommentPage;
