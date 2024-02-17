import React from "react";
import ProfileUpdateFrom from "./ProfileUpdateFrom";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";

function UpdateProfile() {
  // const { data: currUser } = useGetCurrentUser();
  // console.log(currUser);
  return (
    <div className="flex flex-col gap-1 mt-12 ">
      <div className="flex items-center gap-4">
        <img src="/assets/icons/edit.svg" className=" w-8 h-8" />
        <h1 className="">Edit Profile</h1>
      </div>

      <div className="">
        <ProfileUpdateFrom />
      </div>
    </div>
  );
}

export default UpdateProfile;
