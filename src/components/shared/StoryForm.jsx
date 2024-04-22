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
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";

function StoryForm({
  fieldChange,
  mediaUrl,
  setShowButton,
  showButton,
  showImg,
  isLoadingStory,
  storydelete,
  user,
}) {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState();
  const [isVideoFile, setIsVideoFile] = useState(false);
  const videoRef = React.useRef(null);
  const { ref, inView } = useInView();
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
      "video/mp4": [".mp4"],
    },
  });
  const isVideo = async () => {
    if (!fileUrl) return false;

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        console.error("Failed to fetch file");
        return false;
      }

      const blob = await response.blob();
      return blob.type.startsWith("video/");
    } catch (error) {
      console.error("Error determining file type:", error);
      return false;
    }
  };

  useEffect(() => {
    const checkIsVideo = async () => {
      const result = await isVideo();
      setIsVideoFile(result);
    };

    checkIsVideo();
  }, [fileUrl]);

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
            <p className=" text-sm text-gray-500">{user?.username}</p>
          </>
        ) : (
          <div
            ref={ref}
            // className="h-68 w-60 flex flex-col absolute  overflow-hidden"
            className="w-56 h-[316px] overflow-hidden absolute  bg-black px-0
            border-4 border-primary-500 rounded-md"
          >
            <div className="w-full h-100% aspect-w-16 aspect-h-9 object-cover  ">
              {isVideoFile ? (
                <ReactPlayer
                  ref={videoRef}
                  url={fileUrl}
                  controls={false}
                  width="100%"
                  height="100%"
                  playing={inView}
                  loop
                  muted={false}
                ></ReactPlayer>
              ) : (
                //   <video autoPlay={true} controls width="100%" height="100%">
                //     <source src={fileUrl} type="video/mp4" />
                //     Your browser does not support the video tag.
                //   </video>

                <img
                  src={fileUrl}
                  alt="post"
                  width="100%"
                  height="100%"
                  className=" border-4 border-primary-500 rounded-md"
                />
              )}
            </div>
          </div>
        )
      ) : (
        <div className="flex flex-col relative gap-2 max-w-20">
          <img
            src={mediaUrl}
            className="h-16 w-16 rounded-full "
            height={16}
            width={16}
          />
          <img
            src={"/assets/icons/plus.svg"}
            className=" bg-primary-600 rounded-full left-11  absolute bottom-8"
            height={5}
            width={20}
          />
          <p className=" text-sm text-gray-500">{user?.username}</p>
        </div>
      )}
    </div>
  );
}

export default StoryForm;
