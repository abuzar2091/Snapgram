import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StoryDelete from "./StoryDelete";
import { storymultiFormatDateString } from "@/lib/utils";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import AddToHighlight from "./AddToHighlight";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";

function StoryShow({
  postImg,
  userImg,
  user,
  username,
  createdAt,
  setStoryDelete,
  isHighlight = false,
}) {
  console.log("starting ");
  const [isOpen, setIsOpen] = useState(false);
  const { data: currUser } = useGetCurrentUser();
  const videoRef = React.useRef(null);
  const { ref, inView } = useInView();

  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  console.log(isPaused);

  const openPopover = () => {
    setIsOpen(true);
    console.log("popover open hua");
    // Close the popover after 5 seconds
    setTimeout(() => {
      setIsOpen(false);
    }, 6000);
  };

  //   useEffect(() => {
  //     // If the popover is paused, don't set a new timeout

  //     if (!isPaused) {
  //         console.log("dubar se popover");
  //       timeoutId = setTimeout(() => {
  //         setIsOpen(false);
  //       }, 5000);
  //     }
  //     if (isPaused) {
  //         console.log("id clear kr di");
  //       setIsPaused(true);
  //       clearTimeout(timeoutId);
  //     }
  //   }, [isPaused]);

  return (
    <div>
      <Popover open={isOpen} onOpenChange={(newOpen) => setIsOpen(newOpen)}>
        <PopoverTrigger onClick={openPopover}>
          <div
            className="h-[80px] w-[80px] 
             border-primary-600 border-t-purple-700 border-l-purple-600
             
              
          border-t-[4px] border-l-[4px] border-r-[4px] border-b-[4px] rounded-full relative"
          >
            <img
              src={`${
                isHighlight
                  ? `${postImg.includes("admin") ? user?.imageUrl : postImg}`
                  : userImg
              }`}
              className="h-16 w-16 rounded-full absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            {!isHighlight && currUser.username === username && (
              <img
                src="/assets/icons/plus.svg"
                className=" bg-primary-600 rounded-full left-9  absolute bottom-0"
                height={5}
                width={20}
              />
            )}
          </div>

          <p className=" text-sm text-gray-500">{username}</p>
        </PopoverTrigger>
        <PopoverContent className="w-52 h-72 overflow-hidden bg-black p-0 relative">
          <div className="absolute mt-1 w-full">
            <div className=" h-1  bg-gray-400 w-full">
              <div className=" h-1  bg-white animate-slider"></div>
            </div>
            <div className="flex items-center gap-2 ml-2 mt-2">
              <img
                src={`${
                  !isHighlight
                    ? user?.imageUrl
                    : postImg.endsWith("admin")
                    ? user?.imageUrl
                    : postImg
                }`}
                className="h-8 w-8 rounded-full"
              />
              <p>{username}</p>
              <p>{storymultiFormatDateString(createdAt)}</p>
            </div>
          </div>

          <div className="w-full h-100% aspect-w-16 aspect-h-9 object-cover  ">
            {postImg?.endsWith("admin") ? (
              <div ref={ref} className=" ">
                <ReactPlayer
                  ref={videoRef}
                  url={postImg}
                  controls={false}
                  width="100%"
                  height="100%"
                  playing={inView}
                  loop
                  muted={false}
                ></ReactPlayer>
              </div>
            ) : (
              <img src={postImg} width="100%" height="100%"></img>
            )}
          </div>

          {!isHighlight && currUser.username === username && (
            <div className="absolute flex gap-3 right-2 bottom-1">
              <AddToHighlight
                user={user}
                newhighlight={postImg}
                onTogglePause={togglePause}
              />
              <StoryDelete user={user} setStoryDelete={setStoryDelete} />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default StoryShow;
