import {
  useQueryClient,
  useMutation,
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createPost,
  createStory,
  createUserAccount,
  deletePost,
  deleteSavedPost,
  deleteStory,
  getAllUSer,
  getCurrentUSer,
  getCurrentUSerById,
  getInfinitePosts,
  getPostById,
  getRecentPosts,
  getSavedPosts,
 
  getUserByUserName,
  likePost,
  saveComment,
  savePost,
  saveTaggedUser,
  searchPosts,
  signInAccount,
  signOutAccount,
  updateFollowProfile,
  updatePost,
  updateProfile,
} from "../appwrite/api";

import { QUERY_KEYS } from "./queryKeys";
// import { comment } from "postcss";

export const useCreateUserAccount = () => {
  return useMutation({ mutationFn: (user) => createUserAccount(user) });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};
export const useCreateStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => createStory(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) =>deleteStory(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, likesArray }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSaveComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => saveComment(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useSaveTaggedUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => saveTaggedUser(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }) => savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetSavedPosts = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => getSavedPosts(userId),
  });
};

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId) => deleteSavedPost(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUSer,
  });
};
export const useGetCurrentUserById = (userId) => {
  return useQuery({
    queryFn: () => getCurrentUSerById(userId),
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    enabled: !!userId,
  });
};
export const useGetUserByUsername = (username) => {
  return useQuery({
    queryFn: () => getUserByUserName(username),
    queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, username],
    enabled: !!username,
  });
};
export const useGetAllUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: getAllUSer,
  });
};
export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    // enabled: !!postId,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER, data?.$id],
      });
    },
  });
};
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => updateProfile(user),
    onSuccess: (_, user) => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_USER_BY_ID, user?.$id]);
    },
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
    //   });
    // },
  });
};

// Update your useUpdateFollowProfile hook in api.jsx
export const useUpdateFollowProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => updateFollowProfile(user),
    onSuccess: (_, user) => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_USER_BY_ID, user?.$id]);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }) => deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts, // Assuming getInfinitePosts is a function for fetching posts
    getNextPageParam: (lastPage) => {
      // If there's no data, there are no more pages.
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useSearchPosts = (searchTerm) => {
  return useQuery({
   // queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryKey: [QUERY_KEYS.GET_USERS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};
