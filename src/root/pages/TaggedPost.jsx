import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import {
  useGetCurrentUserById,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutation";
import { Link, useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import TagPost from "./TagPost";

function TaggedPost() {
  const { id } = useParams();
  // const {data:user}=useGetCurrentUser();
  console.log(id);
  const { data: users, refetch } = useGetCurrentUserById(id);
  useGetCurrentUserById(id);
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const [postId, setPostId] = useState("");
  const {
    data: getpost,
    isLoading: isPostLoading,
    isError: isPostError,
    refetch: refetchPost,
  } = useGetPostById(postId);

  return (
    <div className="flex flex-col gap-8">
      <Profile isPost={false} tagged={false} />
      {/* {console.log(users)} */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-4 ml-20">
        {users &&
          users.taggedpost.map((post) => {
            const data = JSON.parse(post);
            console.log(data.postId);

        
            return (
                     <Link to={`/posts/${data.postId}`}>
                    <TagPost key={data.postId} postId={data.postId} userId={data.userId}/>
                     </Link>
                   );
            
            // Ab yahan aap JSX code likh sakte hain agar aap chahein
            // Example: <div key={data.postId}>...</div>

            // Aapko koi JSX return karna ho toh yahan likhein
          })}
      </div>
    </div>
  );
}

export default TaggedPost;
