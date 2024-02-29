import React from "react";

import Loader from "./Loader";
import SearchedPost from "./SearchedPost";
import GridUserList from "@/root/pages/GridUserList";

function SearchPeople({ isSearchFetching, searchedUsers }) {
    console.log(searchedUsers);
    console.log(searchedUsers?.documents[0]);
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedUsers && searchedUsers?.documents?.length>0) {
    return (
         <GridUserList users={searchedUsers?.documents} />
       
    //   <SearchedPeople
    //     posts={searchedPosts.documents[0]?.posts}          
    //     searchedDetail={searchedPosts.documents[0]}
    //   />
    );
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No people found</p>
    );
  }
}
export default  SearchPeople;
