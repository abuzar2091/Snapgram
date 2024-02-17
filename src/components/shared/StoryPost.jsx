import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

function StoryPost({ post }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const openPopover = () => {
//     setIsOpen(true);

//     // Close the popover after 5 seconds

//     setTimeout(() => {
//       setIsOpen(false);
//     }, 5000);
//   };

  return (
    <div>   
      <Popover >
        <PopoverTrigger>
          {/* <div className=" relative">
            <img src={"assets/icons/profile-placeholder.svg"} />
            <img
              src="/assets/icons/plus.svg"
              className=" bg-primary-600 rounded-full left-9  absolute bottom-0"
              height={5}
              width={20}
            />
          </div>
          <p className=" text-sm text-gray-500">username</p> */}
        </PopoverTrigger>
        <PopoverContent className="h-70 w-60 flex flex-col ">
          <img src={post} alt="post" />
          <Button type="submit" className=" bg-primary-500 w-1/3 ml-[17.5rem]">
            Your Story
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default StoryPost;
