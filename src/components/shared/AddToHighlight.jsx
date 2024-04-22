import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import {
  useAddStoryHighlight,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutation";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

function AddToHighlight({ user: initialuser, newhighlight, onTogglePause }) {
  const [user, setUser] = useState(initialuser);
  const [inputTitle, setInputTitle] = useState("");
  const { toast } = useToast();
  //  const [highlight, setHighlight] = useState([]);
  const { mutateAsync: addStoryHighlight, isPending: isLoading } =
    useAddStoryHighlight();
  const { data: updatedUser, refetch } = useGetCurrentUser();
  //   console.log(user);
  const handleData = (event) => {
    setInputTitle(event.target.value);
    //setInputTitle("");
  };
  //   console.log(inputTitle);

  const addStoryHighlighted = async () => {
    try {
      //  setHighlight((prevHighlights) => [...prevHighlights, newhighlight]);

      console.log("story addStoryHighlight called first time");
      const isAdded = await addStoryHighlight({
        highlightUrl: newhighlight,
        userId: user.$id,
        highlightTitle: inputTitle,
      });
      if (!isAdded) {
        toast({ title: "Please try again, error in addStoryHighlight" });
      } else {
        console.log("story Added successfully wow");
      }
    } catch (error) {
      console.error("An error occurred while Adding the story", error);
    }
    // setHighlight((prevHighlights) => [...prevHighlights, newhighlight]);
    refetch();
  };
  const handleButtonClick = () => {
    onTogglePause();
  };
  useEffect(() => {
    if (!isLoading && updatedUser) {
      setUser(updatedUser);
    }
  }, [isLoading, updatedUser, handleButtonClick]);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div>
            <img
              src="/assets/icons/list-solid.svg"
              height={15}
              width={15}
              onClick={handleButtonClick}
              className=" bg-white m-auto"
            />
            <p className=" text-[12px]">Highlight</p>
          </div>
        </PopoverTrigger>
        <PopoverContent className=" text-center bg-black flex flex-col gap-2">
          <img
            src={`${
              newhighlight.includes("admin")
                ? user?.imageUrl
                : newhighlight
            }`}
            className="h-16 w-16 rounded-full m-auto"
          />

          {/* <img src={`${newhighlight.endsWith(`admin`)?`/assets/icons/profile-placeholder.svg`:newhighlight`}  className="h-16 w-16 rounded-full m-auto" /> */}
          <Input
            type="email"
            className="shad-input"
            placeholder="highlights title"
            value={inputTitle}
            onChange={handleData}
          />
          <Button onClick={addStoryHighlighted} className=" bg-red text-sm">
            {" "}
            Add To Highlight
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default AddToHighlight;
