import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

function ProfileUploader({ fieldChange, mediaUrl }) {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
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
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex  gap-12 items-center justify-start w-full p-5 lg:p-10 cursor-pointer">
            <img
              src={fileUrl}
              alt="file img"
              className="h-20 w-20 rounded-full ml-0"
            />
            <h1 className=" text-primary-600 text-lg cursor-pointer">
              Change profile photo
            </h1>
          </div>
        </>
      ) : (
        <div className=" h-8">
       
          <p className=" text-primary-600 ">Change profile photo</p>
        
        </div>
      )}
    </div>
  );
}

export default ProfileUploader;
