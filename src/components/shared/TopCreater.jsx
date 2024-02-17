import React from "react";
import CreatorCard from "./CreatorCard";

function TopCreater() {
  return (
    <div className="h-full mt-8 md:block hidden ">
      <h1 className="text-2xl text-white">Top Creaters</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-8">
        <CreatorCard />
      </div>
    </div>
  );
}

export default TopCreater;
