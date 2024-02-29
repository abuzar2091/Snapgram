import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetCurrentUser,
  useGetCurrentUserById,
  useSubmitChat,
} from "@/lib/react-query/queriesAndMutation";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ShowChatting from "./ShowChatting";
import { appwriteConfig, client } from "@/lib/appwrite/config";
import { deleteChatMsg, showChat } from "@/lib/appwrite/api";
import { multiFormatDateString } from "@/lib/utils";

function RoomChating() {
  const { id } = useParams();
  const { mutateAsync: submitChat, isPending: isSavingChat } = useSubmitChat();
  const [message, setMessage] = useState("");

  const { data: user, refetch } = useGetCurrentUserById(id || "");
  const { data: currUser, refetch: refetchCurr } = useGetCurrentUser();
  //   const { pathname } = useLocation();
  useEffect(() => {
    if (id) {
      refetch();
      refetchCurr();
    }
  }, [id, refetch]);
  const [showChats, setShowChats] = useState([]);
  const handleSubmitChat = async (e) => {
    e.preventDefault();
    const newMsg = message;
    console.log(newMsg);
    setMessage("");
    try {
      const data = await submitChat({
        chatMsg: newMsg,
        roomUserId: id,
        currUserId: currUser.$id,
      });
      // console.log(data.chats);
      // setShowChats(data.chats)
      //setShowChats(data)
    } catch (error) {
      console.log("error during chating ", error);
    }
  };

  //   const chatContainerRef = useRef(null);
  const showji = async () => {
    const respone = await showChat(currUser?.$id, id);
    setShowChats(respone?.documents[0]?.chats);
    //console.log(respone.documents[0].chats);
  };

  useEffect(() => {
    showji();
  }, [currUser?.$id, id]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.chatCollectionId}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          setShowChats(response.payload.chats);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const handleDeleteChat = async (messageId) => {
    console.log(messageId);
    try {
      const newChats = showChats?.filter((msg) => {
        const data = JSON.parse(msg);
        return data.chatId !== messageId;
      });

      console.log(newChats);
      setShowChats(newChats);

      // Call the deleteChatMsg function here if needed
      await deleteChatMsg({
        currUserId: currUser?.$id,
        chatting: newChats,
        roomUserId: id,
      });
    } catch (error) {
      console.log("error in deleting msg ", error);
    }
  };

  return (
    <div className=" flex flex-col flex-between h-screen w-[560px] ">
      <Link to={`/profile/${id}`} className="">
        <div className="flex gap-4 mt-8 w-[500px] ml-0 p-2 border-2  rounded-lg border-gray-600   items-center">
          <img src={user?.imageUrl} className="h-12 w-12 rounded-full" />
          <p className="font-bold text-lg">{user?.name}</p>
        </div>
      </Link>
      <div className="mt-2 flex-grow overflow-y-auto">
        <div className="flex  flex-col-reverse justify-start h-full  w-[500px] mb-8">
          {showChats?.map((msg) => {
            const data = JSON.parse(msg);
            return data.creator === currUser?.$id ? (
              <div className="flex flex-col items-end ml-80 " key={data.chatId}>
                <div className="flex">
                  <p className="bg-primary-500 rounded-md text-lg px-8 py-3 mr-4 w-52">
                    {data.chat}
                  </p>
                  <img
                    onClick={() => handleDeleteChat(data.chatId)}
                    src="/assets/icons/delete.svg"
                  />
                </div>
                <p className="text-gray-600">
                  {multiFormatDateString(data.createdAt)}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-start" key={data.chatId}>
                <div className="flex">
                  <p className="bg-gray-700 rounded-md text-lg px-8 py-3 w-52">
                    {data.chat}
                  </p>
                  <img
                    onClick={() => handleDeleteChat(data.chatId)}
                    src="/assets/icons/delete.svg"
                  />
                </div>
                <p className="text-gray-600">
                  {multiFormatDateString(data.createdAt)}
                </p>
              </div>
            );
          })}
        </div>

        {/* <ShowChatting currUserId={currUser?.$id} roomUserId={id} /> */}
      </div>

      <form
        onSubmit={handleSubmitChat}
        className="flex gap-4 mb-8 ml-8  w-full"
      >
        <Input
          className="shad-input"
          placeholder="write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">
          <img
            src="/assets/icons/telegram.svg"
            className=" bg-white h-12 w-12 rounded-lg cursor-pointer"
            alt="send"
          />
        </Button>
      </form>
    </div>
  );
}

export default RoomChating;
