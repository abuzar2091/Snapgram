import Loader from "@/components/shared/Loader";
import { useGetChatting } from "@/lib/react-query/queriesAndMutation";
import { showChat } from "@/lib/appwrite/api";
import React, { useEffect, useState } from "react";
import { multiFormatDateString } from "@/lib/utils";
import { appwriteConfig, client } from "@/lib/appwrite/config";


function ShowChatting({ currUserId, roomUserId }) {
  //   // const {data:currUserChat}=useGetChatting(roomUserId,currUserId);
  //   const {
  //     data: showChat,
  //     isLoading,
  //     refetch,
  //   } = useGetChatting(currUserId, roomUserId);
  const [showChats, setShowChats] = useState([]);
  //   const chatContainerRef = useRef(null);

  useEffect(() => {
    // try{
    const showji = async () => {
      const respone = await showChat(currUserId, roomUserId);
      setShowChats(respone?.documents[0]?.chats);
      // console.log(respone.documents[0].chats);
    };
    showji();
  }, [currUserId, roomUserId]);

  //   useEffect(() => {
  //     refetch();
  //   }, [currUserId, roomUserId]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.chatCollectionId}.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          console.log("A New Document  Was Created");
          setShowChats(response.payload.chats);
          //   console.log("real time respone ",
          //    response.payload.chats);
          //add the logic submitChat() heree
        }

        // databases.[ID].collections.[ID].documents
      }
    );
    return () => unsubscribe();
  }, [roomUserId]);





  //   console.log(showChat);
  //    useEffect(()=>{
  //     const isEmpty=async()=>{
  //     await deletechattingroom(roomUserId)
  //     }
  //     isEmpty()

  //    },[roomUserId])

  //   if (isLoading) {
  //     return (
  //       <div>
  //         Loading...
  //         <Loader />
  //       </div>
  //     );
  //   }


  return (
    <div className="flex  flex-col-reverse justify-end mb-8" >
      {showChats?.map((msg) => {
        const data = JSON.parse(msg);
        return data.creator === currUserId ? (
          <div className="flex flex-col items-end ml-80 " key={data.chatId}>
            <p className="bg-primary-500 rounded-md text-lg px-8 py-3 mr-4 w-52">
              {data.chat}
            </p>
            <p className="text-gray-600">
              {multiFormatDateString(data.createdAt)}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start" key={data.chatId}>
            <p className="bg-gray-700 rounded-md text-lg px-8 py-3 w-52">
              {data.chat}
            </p>
            <p className="text-gray-600">
              {multiFormatDateString(data.createdAt)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ShowChatting;
