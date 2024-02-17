import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  useGetAllUser,
  useGetCurrentUser,
  useGetCurrentUserById,
  useUpdateFollowProfile,
} from "@/lib/react-query/queriesAndMutation";

import Loader from "./Loader";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUSerById } from "@/lib/appwrite/api";

function CreatorCard({ isUsername = false, className = "" }) {
  const location = useLocation();
  const pathname = location.pathname;


  // const [comments, setComments] = useState([]);
  // const [post, setPost] = useState(initialpost);

  const { data: currUser, refetch } = useGetCurrentUser();

  const [ids, setIds] = useState("");
  // const {data:getCurrentUser}=useGetCurrentUserById(ids|| "");
  // if(!ids){

  //   console.log(ids);
  // }
  // const { data: getCurrentUser, refetch: refetchCurrentUser } =
  //   useGetCurrentUserById(ids);
  const { data: getCurrentUser, isLoading: isPostLoading, isError: isPostError,refetch: refetchCurrentUser} =
  useGetCurrentUserById(ids);
  // useEffect(() => {
  //   if (!isPostLoading && !isPostError && ) {
  //     setPost(updatedPost);
  //    // console.log(updatedPost);
  //   }
  // }, [isPostLoading, isPostError, getCurrentUser]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      // Fetch the current user's data on component mount
      await refetch();
    };

    fetchCurrentUser();
  }, [refetch]);

  // useEffect(() => {
  //   if (ids) {
  //     const fetchData = async () => {
  //       await refetchCurrentUser();
  //     };
  //     fetchData();
  //   }
  // }, [ids,setIds]);

  // useEffect(()=>{

  // })

  const UserFollowers = ({ userId }) => {
    const { data: getCurrentUSerById } = useGetCurrentUserById(userId);

    return <p>{getCurrentUSerById ? getCurrentUSerById.name : ""}</p>;
  };

  // getCurrentUSerById
  const {
    data: users,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetAllUser();

  const [render, setReRender] = useState(false);
  const { mutateAsync: updateFollowProfile } = useUpdateFollowProfile();

  // console.log(currUser.following);

  const handleFollow = async (userId, status) => {
    setIds(userId);
    await refetchCurrentUser();

    try {
     
      //  const { data: getCurrentUSerById }=useGetCurrentUserById(userId);
      const updatedCurrentUser = await updateFollowProfile({
        ...currUser,
        following: status
          ? currUser.following.filter((currid) => currid !== userId)
          : [...currUser.following, userId],
      });
      if (!updatedCurrentUser) {
        console.log("Gadbad h beta ");
      }
      const updatedFollowers = status
        ? getCurrentUser?.followers?.filter((id) => id !== currUser.$id) || []
        : [...getCurrentUser.followers, currUser.$id];
      await updateFollowProfile({
        ...getCurrentUser,
        followers: updatedFollowers,
      });
    } catch (e) {
      console.log(e);
    }
   //setIds("");
    // setReRender(true);
  };

  return (
    <>
      {isUserLoading ? (
        <Loader />
      ) : (
        users &&
        users.map((user) => (
          <Link to={`/profile/${user.$id}`}>
            <div
              key={user.id}
              className={`${className} border-2 border-gray-700 shadow-inner h-[195px] w-40 rounded-3xl flex flex-col  items-center`}
            >
              <img
                src={user.imageUrl}
                alt="user-img"
                className="h-10 w-10 rounded-full mt-4"
              />
              <h3 className="mt-2 text-white text-lg">{user.name}</h3>
              {isUsername ? (
                <p className="text-gray-500 text-sm">@{user.username}</p>
              ) : (
                <p className="text-gray-500 text-sm">
                  {user.followers.length > 0 ? (
                    <p className="text-gray-500 text-sm ">
                      followed by{" "}
                      <UserFollowers
                        userId={user.followers[user.followers.length - 1]}
                      />
                    </p>
                  ) : (
                    <p className="text-gray-500 ">No followers</p>
                  )}
                </p>
              )}
              {/* {console.log(user.$id)} */}
              <Link to={`${pathname}`} className="w-1/2">
                {console.log("again")}
                <Button
                  className={` w-full ${
                    currUser?.following?.includes(user.$id)
                      ? "bg-white text-gray-700 mt-2 rounded-xl"
                      : "shad-button_primary whitespace-nowrap mt-2 rounded-2xl px-100"
                  }`}
                  onClick={() =>
                    handleFollow(
                      user.$id,
                      currUser?.following?.includes(user.$id)
                    )
                  }
                >
                  {currUser?.following?.includes(user.$id)
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              </Link>
            </div>
          </Link>
        ))
      )}
    </>
  );
}

export default CreatorCard;
