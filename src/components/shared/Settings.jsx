import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import { appwriteConfig, databases } from "@/lib/appwrite/config";
import Highlights from "./Highlights";

function Settings() {
  const [checked, setChecked] = useState(false);
  const { data: user } = useGetCurrentUser();

  useEffect(() => {
    // const isAccountUpdated=async()=>{
    //      await databases.updateDocument(
    //          appwriteConfig.databaseId,
    //          appwriteConfig.userCollectionId,
    //          user.$id,
    //          {
    //             accountprivacy:checked
    //          }
    //      )
    // }
    // isAccountUpdated();
    //rough workk
    // const id="65be10d92eb3c5291823"
    // const deleteStory=async()=>{
    //   await databases.updateDocument(
    //     appwriteConfig.databaseId,
    //     appwriteConfig.userCollectionId,
    //     id,
    //     {
    //       story:"",
    //     }
    //   )
    // }
    // deleteStory();
  }, [checked, user]);
  return (
    <div className="flex flex-col w-full">
      <div className=" flex gap-8 ml-8  h3-bold md:h4-bold text-left  mt-12">
        <img
          src="/assets/icons/settings.svg"
          className="bg-white rounded-lg h-10 w-10"
        />
        <p className="">Settings and Privacy</p>
      </div>
      <div className="flex gap-8 ml-8 items-center mt-12">
        <div className="flex gap-3 cursor-pointer">
          <img
            src="/assets/icons/lock.svg "
            className="bg-white rounded-sm h-6 w-6"
          />
          <Label
            htmlFor="airplane-mode"
            className="font-bold text-md cursor-pointer"
          >
            Account Privacy
          </Label>
        </div>
        <Switch
          checked={checked}
          onClick={() => setChecked((prev) => !prev)}
          id="airplane-mode"
          className={` ${!checked ? `bg-blue-700` : `bg-green-700`}`}
        />
      </div>
      <p className="ml-8 text-xl mt-4">{checked ? "Private" : "Public"}</p>
    </div>
  );
}

export default Settings;
