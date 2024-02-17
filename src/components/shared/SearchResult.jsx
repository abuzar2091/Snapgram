import React from "react";

import Loader from "./Loader";
import GridPostList from "./GridPostList";
import SearchedPost from "./SearchedPost";

function SearchResult({ isSearchFetching, searchedPosts }) {
 // console.log(searchedPosts.documents[0]?.name);
 // if (searchedPosts) console.log(searchedPosts?.documents[0]?.posts);
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return (
      <SearchedPost
        posts={searchedPosts.documents[0]?.posts}
       
        searchedDetail={searchedPosts.documents[0]}
      />
    );
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
}
export default SearchResult;
