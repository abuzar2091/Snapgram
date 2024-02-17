// import React, { useState, useCallback, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import { Button } from "../ui/button";

// function FileUploader({ fieldChange, mediaUrl }) {
//   const [file, setFile] = useState([]);
//   const [fileUrl, setFileUrl] = useState(mediaUrl);
//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       setFile(acceptedFiles);
//       fieldChange(acceptedFiles);
//       setFileUrl(URL.createObjectURL(acceptedFiles[0]));
//     },
//     [file]
//   );
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpeg", ".jpg", ".svg"],
//       "video/mp4": [".mp4"],
//     },
//   });

//   const isVideo = async () => {
//     if (!fileUrl) return false;

//     try {
//       const response = await fetch(fileUrl);
//       if (!response.ok) {
//         console.error("Failed to fetch file");
//         return false;
//       }

//       const blob = await response.blob();
//       //return blob.type

//       return blob.type.startsWith("video/");
//     } catch (error) {
//       console.error("Error determining file type:", error);
//       return false;
//     }
//   };

//   const renderFile = async () => {
//     const result = await isVideo();

//     if (result) {
//       return (
//         <video controls width="50%" height="40%">
//           <source src={fileUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       );
//     } else {
//       return <img src={fileUrl} alt="file img" className="file_uploader-img" />;
//     }
//   };

//   useEffect(() => {
//     renderFile(); // You can call renderFile here or wherever you need to trigger it.
//   }, [fileUrl]);

//   return (
//     <div
//       {...getRootProps()}
//       className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
//     >
//       <input {...getInputProps()} className="cursor-pointer" />
//       {fileUrl ? (
//         <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
//           {renderFile()}
//         </div>
//       ) : (
//         <div className="file_uploader-box">
//           <img
//             src="/assets/icons/file-upload.svg"
//             width={60}
//             height={30}
//             alt="file-upload"
//           />
//           <h3 className="base-medium text-light-2 mb-2 mt-2">
//             Drag photo here
//           </h3>
//           <Button className="shad-button_dark_4">Upload from Computer</Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FileUploader;
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

function FileUploader({ fieldChange, mediaUrl }) {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [isVideoFile, setIsVideoFile] = useState(false);

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
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
          {isVideoFile ? (
            <video controls width="50%" height="40%">
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={fileUrl} alt="file img" className="file_uploader-img" />
          )}
        </div>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={60}
            height={30}
            alt="file-upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-2">
            Drag photo here
          </h3>
          <Button className="shad-button_dark_4">Upload from Computer</Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;

