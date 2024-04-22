import {
  useDeleteStory,
  useGetAllUser,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutation";
import React from "react";
import Loader from "./Loader";
import StoryShow from "./StoryShow";

function RenderStory() {
  const {
    data: users,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetAllUser();
  const { data: currUser } = useGetCurrentUser();
  const { mutateAsync: deleteStory, isPending: isLoading } = useDeleteStory();
  //   { postImg, userImg,user, username, createdAt, setStoryDelete }
  return (
    <>
      {isUserLoading ? (
        <Loader />
      ) : (
        users &&
        users.map((user) => {
          if (
            user.story != null &&
            user.story.length > 0 &&
            user.name != "Abuzar Khan" &&
            user.name != currUser.name
          ) {
            const data = JSON.parse(user?.story);
            const creationTime = new Date(data.createdAt);
            const currentTime = new Date();

            // Calculate the time difference in milliseconds
            const timeDifference = currentTime - creationTime;

            // Check if the story was created less than 5 minutes ago
            if (timeDifference < 5 * 60 * 60 * 1000) {
              return (
                <div className="flex gap-3 ml-0">
                  <StoryShow
                    postImg={data.storyImg}
                    userImg={user.imageUrl}
                    username={user.username}
                    createdAt={data.createdAt}
                    user={user}
                  />
                </div>
              );
            } else {
              const storydeleted = async () => {
                try {
                  // Your deletion logic here

                  console.log("story deletion called first time");
                  const isDeleted = await deleteStory(user);
                  if (!isDeleted) {
                    toast({
                      title: "Please try again, error in deleting beta",
                    });
                  } else {
                    console.log("story Deleted successfully wow");
                  }
                } catch (error) {
                  console.error(
                    "An error occurred while deleting the story",
                    error
                  );
                  //toast({ title: "An error occurred while deleting the story" });
                }
                //   refetch()
              };
              storydeleted();
            }
          }
        })
      )}
    </>
  );
}

export default RenderStory;

//     // Check conditions before rendering the image
//     if (user.name !== "Abuzar Khan" && data.storyImg.length > 0) {
//       return (
//         <img
//           key={user.$id} // Add a unique key for each element in the array
//           src={data?.storyImg}
//           height={16}
//           width={16}
//           className="rounded-full"
//           alt="Story"
//         />
//       );
//     }}
//     return null; // Return null for cases where the condition is not met
//   })
