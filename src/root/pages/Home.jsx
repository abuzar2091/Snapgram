import Loader from "@/components/shared/Loader";
import React, { useEffect } from "react";
import PostCard from "@/components/shared/PostCard";

import {
  useGetPosts,
  useGetRecentPosts,
} from "@/lib/react-query/queriesAndMutation";
import { useInView } from "react-intersection-observer";
import CreateStory from "@/components/shared/CreateStory";

//i also did use the infinite scrolling functionality in the home page

function Home() {
  // const {
  //   data: posts,
  //   isPending: isPostLoading,
  //   isError: isErrorPost,
  // } = useGetRecentPosts();

  const { ref, inView } = useInView();
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPost,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex flex-col mt-8">
      <CreateStory className="max-w-30" />
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left max-w-full">Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul
              className="flex flex-col
          flex-1 gap-9 w-full
          "
            >
              {posts.pages.map((item, index) => (
                <React.Fragment key={index}>
                  {item.documents.map((post) => (
                    <PostCard post={post} key={post.caption} />
                  ))}
                </React.Fragment>
              ))}

              {/* <GridPostList key={`page-${index}`} posts={item.documents} />
         ))} */}

              {/* {posts?.documents.map((post) => (
                <PostCard post={post} key={post.caption} />
              ))} */}
            </ul>
          )}
        </div>
      </div>
      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Home;
