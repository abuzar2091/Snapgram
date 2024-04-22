import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import {
  useDeleteStory,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutation";

function StoryDelete({ user: initialuser, setStoryDelete }) {
  const [user, setUser] = useState(initialuser);
  const { mutateAsync: deleteStory, isPending: isLoading } = useDeleteStory();
  const { data: updatedUser, refetch } = useGetCurrentUser();

  const storydeleted = async () => {
    try {
      // Your deletion logic here

      console.log("story deletion called first time");
      const isDeleted = await deleteStory(user);
      if (!isDeleted) {
        toast({ title: "Please try again, error in deleting beta" });
      } else {
        console.log("story Deleted successfully wow");
      }
    } catch (error) {
      console.error("An error occurred while deleting the story", error);
      //toast({ title: "An error occurred while deleting the story" });
    }
    refetch();
    setStoryDelete((prev) => !prev);
  };
  useEffect(() => {
    if (!isLoading && updatedUser) {
      setUser(updatedUser);
    }
  }, [isLoading, updatedUser]);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div>
            <img
              src="/assets/icons/3dot.svg"
              height={10}
              width={6}
              className=" bg-white"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-black flex">
          <Button onClick={storydeleted} className=" bg-red">
            {" "}
            Delete
          </Button>
          <p className="m-auto">Delete Story</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default StoryDelete;
