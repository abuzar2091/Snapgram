import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import Loader from "./Loader";
import StoryPost from "./StoryPost";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

function StoryForm({
  fieldChange,
  mediaUrl,
  setShowButton,
  showButton,
  showImg,
  isLoadingStory,
  storydelete,
}) {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      setShowButton(true);
    },
    [file, setShowButton]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      //   className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="" />
      {fileUrl ? (
        // <div className="flex cursor-pointer">
        showImg ? (
          <>
            <img
              src={mediaUrl}
              className={`h-16 w-16 rounded-full ${isLoadingStory ? `` : ``} `}
            />
            <p className=" text-sm text-gray-500">usernameandr</p>
          </>
        ) : (
          <div className="h-70 w-60 flex flex-col  absolute">
            <img src={fileUrl} alt="post" />
          </div>
        )
      ) : (
        <div className="flex flex-col gap-1 max-w-20">
          <div className=" relative">
            <img
              src={mediaUrl}
              className="h-16 w-16 rounded-full"
              height={16}
              width={16}
            />
            <img
              src={"/assets/icons/plus.svg"}
              className=" bg-primary-600 rounded-full left-10  absolute bottom-0"
              height={5}
              width={20}
            />
          </div>
          <p className=" text-sm text-gray-500">usernamebhr</p>
        </div>
      )}
    </div>
  );
}

export default StoryForm;
