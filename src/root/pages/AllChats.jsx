import { Input } from "@/components/ui/input";
import {
  useGetAllUser,
  useSearchUsers,
} from "@/lib/react-query/queriesAndMutation";

import { useInView } from "react-intersection-observer";

import React, { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";
import GridUserList from "./GridUserList";
import SearchPeople from "@/components/shared/SearchPeople";

function AllChats() {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: users, fetchNextPage, hasNextPage } = useGetAllUser();
  const { data: searchedUsers, isFetching: isSearchFetching } =
    useSearchUsers(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);
  if (!users) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  // console.log(users);
  const shouldShowSearchResults = searchValue !== "";
  const shouldShowUsers = !shouldShowSearchResults && users.length == 0;

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search People</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />

          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-5xl mt-6 mb-7">
        <img
          src="/assets/icons/chat.svg"
          className="text-light-2 "
          width={20}
          height={20}
        />
        <h3 className="body-bold md:h4-bold">All Chats</h3>
      </div>

      <div className="flex  flex-col gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchPeople
            isSearchFetching={isSearchFetching}
            searchedUsers={searchedUsers}
          />
        ) : shouldShowUsers ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          // users.map((user, index) => (
          //   <GridUserList key={`page-${index}`} user={user} />
          // ))
          <GridUserList users={users} className=""/>
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AllChats;
