import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";


function StoryDelete({  setStoryDelete }) {

    const storydeleted = async () => {
        try {
          setStoryDelete(true);
          // Your deletion logic here
        } catch (error) {
          console.error("An error occurred while deleting the story", error);
          setStoryDelete(false); // Reset the state if an error occurs
        }
      };
    
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div>
            <img
              src="/assets/icons/3dot.svg"
              height={10}
              width={10}
              className=" bg-white ml-[198px]"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="">
          <Button onClick={storydeleted} className=" bg-red">
            {" "}
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default StoryDelete;
