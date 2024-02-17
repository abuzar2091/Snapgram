import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./auth/forms/SignupForm";
import SigninForm from "./auth/forms/SigninForm";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./root/pages";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./root/RootLayout";

import { Toaster } from "@/components/ui/toaster";
import UserReels from "./root/pages/UserReels";
import TaggedPost from "./root/pages/TaggedPost";
import Reels from "./root/pages/Reels";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />

          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/profile/:id/reels" element={<UserReels />} />
          <Route path="/profile/:id/tagged" element={<TaggedPost />} />
          <Route path="/update-profile/:id/*" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
