import CreatorCard from "@/components/shared/CreatorCard";
import React from "react";

function AllUsers() {
  return (
    <div className="h-full mt-8 md:block hidden ">
      <div className="flex gap-3">
        <img src="/assets/icons/people.svg" />
        <span className="text-2xl text-white">All Users</span>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-24 mt-8 ml-36">
        <CreatorCard isUsername={true} className="" />
      </div>
    </div>
  );
}

export default AllUsers;
