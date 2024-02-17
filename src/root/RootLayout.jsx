import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import TopCreater from "@/components/shared/TopCreater";
import Topbar from "@/components/shared/Topbar";
import React from "react";
import { Outlet,useLocation } from "react-router-dom";

function RootLayout() {
  const location = useLocation();
  console.log(location.pathname);
  const isHomeRoute = location.pathname === "/";

  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex  h-full">
        <Outlet />
      </section>
      {isHomeRoute && <TopCreater />}
      
      <Bottombar />
    </div>
  );
}

export default RootLayout;
