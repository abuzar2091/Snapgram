// import React, { useEffect, useState } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// function CreateStory() {
//   const [isOpen, setIsOpen] = useState(false);

//   const openPopover = () => {
//     setIsOpen(true);

//     // Close the popover after 5 seconds
//     setTimeout(() => {
//       setIsOpen(false);
//     }, 5000);
//   };

//   return (
//     <div>
//       <Popover open={isOpen} onOpenChange={(newOpen) => setIsOpen(newOpen)}>
//         <PopoverTrigger onClick={openPopover}>
//           <div className=" relative">
//             <img src={"assets/icons/profile-placeholder.svg"} />
//             <img
//               src="/assets/icons/plus.svg"
//               className=" bg-primary-600 rounded-full left-9  absolute bottom-0"
//               height={5}
//               width={20}
//             />
//           </div>
//           <p className=" text-sm text-gray-500">username</p>
//         </PopoverTrigger>
//         <PopoverContent className="w-60">
//           <div className=" h-1  bg-gray-400 w-full">
//             <div className=" h-1  bg-white animate-slider"></div>
//           </div>

//           <div className="h-100">
//             <img src="/assets/icons/mypic3.jpg" />
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

// export default CreateStory;
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import {
  useCreatePost,
  useCreateStory,
  useDeleteStory,
  useGetCurrentUser,
  useUpdateProfile,
} from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { CreateStoryValidation } from "@/lib/validation";
import { Input } from "@/components/ui/input";
// import FileUploader from "@/components/shared/FileUploader";
import ProfileUploader from "@/components/shared/ProfileUploader";
import StoryForm from "./StoryForm";
import StoryShow from "./StoryShow";
// import { createStory } from "@/lib/appwrite/api";

function CreateStory() {
  const [showButton, setShowButton] = useState(false);
  const [storydelete, setStoryDelete] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const { toast } = useToast();
  const { data: user } = useGetCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {}, []);
  //const isLoadingUpdate = false;
  const { mutateAsync: createStory, isPending: isLoadingStory } =
    useCreateStory();
  const { mutateAsync: deleteStory, isPending: isLoading } = useDeleteStory();
  //const { mutateAsync: updateProfile, isPending: isLoadingUpdate } =  useUpdateProfile();
  const handleSubmit = () => {
    setShowImg(true);
  };
  const form = useForm({
    resolver: zodResolver(CreateStoryValidation),
    defaultValues: {
      file: [],
    },
  });

  async function onSubmit(values) {
    console.log(values);
    const setCreateStory = await createStory({
      ...values,
      userId: user.$id,
      user: user,
    });
    if (!setCreateStory) {
      toast({ title: "please try again error in creating story" });
    }
    //console.log(user.story.length);
    return navigate("/");
  }

  useEffect(() => {
    const deletedStory = async () => {
      try {
        const isDeleted = await deleteStory(user);
        if (!isDeleted) {
          toast({ title: "Please try again, error in deleting beta" });
        } else {
          console.log("Deleted successfully wow");
        }
      } catch (error) {
        console.error("An error occurred while deleting the story", error);
        //toast({ title: "An error occurred while deleting the story" });
      } finally {
        setStoryDelete(false); // Reset the state in any case (success or error)
      }
    };

    deletedStory();
  }, [storydelete]);

  console.log(user);
  const data = user?.story ? JSON.parse(user?.story) : "";
  console.log("set delete ", storydelete);
  console.log(data);

  return (
    <>
      {data?.storyImg?.length > 0 ? (
        <StoryShow
          postImg={data?.storyImg}
          userImg={user.imageUrl}
          storydelete={storydelete}
          setStoryDelete={setStoryDelete}
        />
      ) : (
        <Form {...form}>
          <div className="max-w-24 pl-0">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              //className="flex flex-col gap-2 w-full mt-1"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=""></FormLabel>
                    <FormControl>
                      <StoryForm
                        fieldChange={field.onChange}
                        mediaUrl={user?.imageUrl}
                        showButton={showButton}
                        setShowButton={setShowButton}
                        showImg={showImg}
                        isLoadingStory={isLoadingStory}
                        storydelete={storydelete}
                      />
                    </FormControl>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
              {console.log(showButton)}
              {showButton && (
                <Button
                  type="submit"
                  className={`bg-primary-500 absolute mt-[198px] ml-36 ${
                    showImg ? "hidden" : ""
                  }`}
                  onClick={handleSubmit}
                >
                  {isLoadingStory
                    ? ""
                    : // <img src={user?.imageUrl} className="h-16 w-16 rounded-full" />
                      // <div className="flex-center gap-2">
                      //   <Loader /> Loading...
                      // </div>
                      "Your Story"}
                </Button>
              )}
            </form>
          </div>
        </Form>
      )}
      {/* <Form {...form}>
        <div className="max-w-24 pl-0">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            //className="flex flex-col gap-2 w-full mt-1"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=""></FormLabel>
                  <FormControl>
                    <StoryForm
                      fieldChange={field.onChange}
                      mediaUrl={user?.imageUrl}
                      showButton={showButton}
                      setShowButton={setShowButton}
                      showImg={showImg}
                      isLoadingStory={isLoadingStory}
                    />
                  </FormControl>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
            {console.log(showButton)}
            {showButton && (
              <Button
                type="submit"
                className={`bg-primary-500 absolute mt-[198px] ml-36 ${
                  showImg ? "hidden" : ""
                }`}
                onClick={handleSubmit}
              >
                {isLoadingStory
                  ? ""
                  : // <img src={user?.imageUrl} className="h-16 w-16 rounded-full" />
                    // <div className="flex-center gap-2">
                    //   <Loader /> Loading...
                    // </div>
                    "Your Story"}
              </Button>
            )}
          </form>
        </div>
      </Form> */}
    </>
  );
}

export default CreateStory;
