import React from "react";
import { Link } from "react-router-dom";

function GridUserList({ users }) {
  return (
    users &&
    users.map((user) => (
        <Link to={`/chats/${user.$id}`}>
      <div className="flex gap-4 ml-4 cursor-pointer" key={user.$id}>
        <div>
          <img
            src={user.imageUrl}
            className="h-16 w-16 rounded-full"
            alt="people"
          />
        </div>
        <div className="flex flex-col">
          <p className="body-bold text-sm">{user.name}</p>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>
      </Link>
    ))
  );
}

export default GridUserList;
