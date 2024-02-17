import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StoryDelete from "./StoryDelete";

function StoryShow({ postImg, userImg,  storydelete, setStoryDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopover = () => {
    setIsOpen(true);

    // Close the popover after 5 seconds
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };
//   const handleDelete = async () => {
//     setStoryDelete(true);

//     // Other delete logic...
//   };

  return (
    <div>
      <Popover open={isOpen} onOpenChange={(newOpen) => setIsOpen(newOpen)}>
        <PopoverTrigger onClick={openPopover}>
          <div className=" relative">
            <img src={userImg} className="h-16 w-16 rounded-full" />
            <img
              src="/assets/icons/plus.svg"
              className=" bg-primary-600 rounded-full left-9  absolute bottom-0"
              height={5}
              width={20}
            />
          </div>
          <p className=" text-sm text-gray-500">username popover</p>
        </PopoverTrigger>
        <PopoverContent className="w-60 relative">
          <div className=" h-1  bg-gray-400 w-full">
            <div className=" h-1  bg-white animate-slider"></div>
          </div>

          <div className="h-44">
            <img src={postImg}></img>
          </div>
          <StoryDelete
            setStoryDelete={setStoryDelete}
            className=" absolute bottom-2"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default StoryShow;
