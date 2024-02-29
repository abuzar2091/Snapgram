import React from "react";
import AllChats from "./AllChats";
import { Outlet, useLocation } from "react-router-dom";

function ChatLayout() {
  return (
    <div className="w-full flex gap-4 md:flex">
      <AllChats />
      <section className=" h-full">
        <Outlet />
      </section>
    </div>
  );
}

export default ChatLayout;
