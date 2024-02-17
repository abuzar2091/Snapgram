// import { useUserContext } from "@/context/AuthContext";
// import { useGetCurrentUser, useGetCurrentUserById } from "@/lib/react-query/queriesAndMutation";
// import React, { useEffect } from "react";
// import { Link, useParams, useLocation } from "react-router-dom";

// function Profile() {
//   // const { user } = useUserContext();
//   const { id } = useParams();
//   console.log(id);
//   const { data: users, refetch } = useGetCurrentUserById(id);
//   const { pathname } = useLocation();
//   console.log(users);
// console.log(pathname);
//   useEffect(() => {
//     if(id){
//       refetch();
//     }
//   }, [id,refetch]);

//   return (
//     // <div>
//     //   <div className="flex mt-10 gap-10">
//     //     <div>
//     //       <Link to={`${pathname}`} className="flex gap-3 items-center">
//     //         <img
//     //           src={users.imageUrl || "/assets/icons/profile-placeholder.svg"}
//     //           alt="profile"
//     //           className="h-14 w-14 rounded-full"
//     //           width={170}
//     //           height={36}
//     //         />
//     //       </Link>
//     //     </div>

//     //     <div className="flex flex-col">
//     //       <div className="flex gap-20">
//     //         <p className=" body-bold ">{users.name}</p>

//     //         <Link to={`/update-profile/${users.$id}`}>
//     //           <img
//     //             src="/assets/icons/edit.svg"
//     //             alt="editprofile"
//     //             className="h-6 w-6 rounded-sm"
//     //           />
//     //         </Link>
//     //       </div>
//     //       <p className="small-regular text-light-3">@{users.username}</p>
//     //       <div className="flex gap-6 mt-4">
//     //         <div className="">
//     //           <p className="text-primary-500">{users?.posts.length}</p>
//     //           <p>Posts</p>
//     //         </div>
//     //         <div>
//     //           <p className="text-primary-500">{users?.posts.length}</p>
//     //           <p>Followers</p>
//     //         </div>
//     //         <div>
//     //           <p className="text-primary-500">{users?.posts.length}</p>
//     //           <p>Following</p>
//     //         </div>
//     //       </div>
//     //       <p className="mt-4">{users?.bio}</p>
//     //     </div>
//     //   </div>
//     // </div>
//     <>
//     nothing to loose
//     </>
//   );
// }

// export default Profile;

import Loader from "@/components/shared/Loader";
// import { useUserContext } from "@/context/AuthContext";
import {
  useGetCurrentUser,
  useGetCurrentUserById,
  useUpdateFollowProfile,
} from "@/lib/react-query/queriesAndMutation";
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import UserPost from "./UserPost";
import { Button } from "@/components/ui/button";

function Profile({ isPost = true ,tagged=true }) {
  // const { user } = useUserContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowers, setIsFollowers] = useState(false);
  const { id } = useParams();
  const { data: users, refetch } = useGetCurrentUserById(id || "");
  const { data: currUser } = useGetCurrentUser();
  const { mutateAsync: updateFollowProfile, isPending: isLoadingUpdate } =
    useUpdateFollowProfile();
  // const {iduser}=useUserContext();
  const { pathname } = useLocation();

  // console.log(currUser.$id, id);
  console.log();

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  useEffect(() => {
    // const isfollow = currUser?.following.includes(id);
    // console.log(isfollow);
    setIsFollowing(currUser?.following.includes(id));
    setIsFollowers(users?.following.includes(currUser?.$id));
  }, [id]);
  // console.log(isFollowing);

  const handleFollowToggle = async () => {
    try {
      // Update the current user's following list
      console.log(currUser);
      const updatedCurrentUser = await updateFollowProfile({
        ...currUser,
        following: isFollowing
          ? currUser.following.filter((currid) => currid !== id)
          : [...currUser.following, id],
      });

      // Update the user being followed's followers list
      console.log(currUser);
      console.log(users);
      await updateFollowProfile({
        ...users,
        followers: isFollowing
          ? users.followers.filter((id) => id !== currUser.$id)
          : [...users.followers, currUser.$id],
      });
      console.log(users);
      // Toggle the following state
      setIsFollowing((prev) => !prev);
      setIsFollowers((prev) => !prev);
    } catch (error) {
      console.error("Error updating following status:", error);
    }
  };

  // console.log(users);
  // console.log(currUser);

  return (
    <div className="flex flex-col">
      <div>
        {users ? (
          <div className="flex mt-10 gap-10">
            <div>
              <Link to={`${pathname}`} className="flex gap-3 items-center">
                <img
                  src={
                    users.imageUrl || "/assets/icons/profile-placeholder.svg"
                  }
                  alt="profile"
                  className="h-14 w-14 rounded-full"
                  width={170}
                  height={36}
                />
              </Link>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-20">
                <p className="body-bold ">{users.name}</p>

                {currUser?.$id === id ? (
                  <Link to={`/update-profile/${users.$id}`}>
                    <img
                      src="/assets/icons/edit.svg"
                      alt="editprofile"
                      className="h-6 w-6 rounded-sm"
                    />
                  </Link>
                ) : (
                  isFollowing !== null && (
                    <div className="flex gap-10 justify-end">
                      <Button
                        type="submit"
                        className={`w-1/3 px-11 ${
                          isFollowing
                            ? "bg-white text-gray-700"
                            : "bg-primary-500"
                        }`}
                        onClick={handleFollowToggle}
                      >
                        {}
                        {isFollowing
                          ? "Unfollow"
                          : isFollowers
                          ? "Follow Back"
                          : "Follow"}
                      </Button>

                      <Button type="submit" className="bg-white text-gray-700">
                        Message
                      </Button>
                    </div>
                  )
                )}
              </div>
              <p className="small-regular text-light-3">@{users?.username}</p>
              <div className="flex gap-6 mt-4">
                <div className="">
                  <p className="text-primary-500">{users?.posts.length}</p>
                  <p>Posts</p>
                </div>
                <div>
                  <p className="text-primary-500">{users?.followers.length}</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="text-primary-500">{users?.following.length}</p>
                  <p>Following</p>
                </div>
              </div>
              <p className="mt-4">{users?.bio}</p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <div>
        <div className="flex gap-24 mt-12 ml-20">
          <div className="">
            <Link
              to={`/profile/${users?.$id}`}
              className="flex  items-center gap-3"
            >
              <img src="/assets/icons/posts.svg" />
              <span>Posts</span>
            </Link>
            {pathname === `/profile/${users?.$id}` ? (
              <div className="h-[2px] mt-2 bg-slate-300"></div>
            ) : (
              ""
            )}
          </div>

          <div className="">
            <Link
              to={`/profile/${users?.$id}/reels`}
              className="flex  items-center gap-3"
            >
              <img src="/assets/icons/posts.svg" />
              <span>Reels</span>
            </Link>
            {pathname === `/profile/${users?.$id}/reels` ? (
              <div className="h-[2px] mt-2 bg-slate-300"></div>
            ) : (
              ""
            )}
          </div>
          <div className="">
            <Link
              to={`/profile/${users?.$id}/tagged`}
              className="flex  items-center gap-3"
            >
              <img src="/assets/icons/posts.svg" />
              <span>Tagged</span>
            </Link>
            {pathname === `/profile/${users?.$id}/tagged` ? (
              <div className="h-[2px] mt-2 bg-slate-300"></div>
            ) : (
              ""
            )}
          </div>
        </div>
        {
          tagged &&
      <UserPost user={users}  isPosts={isPost} />
        }
      </div>
    </div>
  );
}

export default Profile;
