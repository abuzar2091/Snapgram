import React, { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {
  useGetCurrentUser,
  useSignOutAccount,
} from "@/lib/react-query/queriesAndMutation";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";

function LeftSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: signOutAccount } = useSignOutAccount();

  const handleSignOut = async (e) => {
    e.preventDefault();
    signOutAccount();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  const { data: users } = useGetCurrentUser();
  // console.log(user);
  // console.log(user?.id);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-8">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        {/* const userId=${user.id} */}
        <Link to={`/profile/${user?.id}`} className="flex gap-3 items-center">
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
            width={170}
            height={36}
          />
          <div className="flex flex-col">
            <p className="body-bold">{user?.name}</p>
            <p className="small-regular text-light-3">@{user?.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4 "
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white
                    ${isActive && "invert-white"}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost mt-4"
        onClick={handleSignOut}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
      <Link to={"/settings"}>
        <div className="flex gap-4 ml-4 mt-2 cursor-pointer">
          <img
            src="/assets/icons/settings.svg"
            alt="setting"
            className=" bg-white rounded-lg "
            variant="ghost"
          />
          <p className="small-medium lg:base-medium">Settings</p>
        </div>
      </Link>
    </nav>
  );
}

export default LeftSidebar;
