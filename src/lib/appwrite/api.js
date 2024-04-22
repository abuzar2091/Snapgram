import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { v4 as uuidv4 } from "uuid";
export async function createUserAccount(user) {
  console.log(user.email);
  console.log(user.username);
  try {
    console.log("start try");
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw error;
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
    // console.log(newAccount);
  } catch (error) {
    console.log("something is wrong during signup ", error);
    return error;
  }
}

export async function saveUserToDB(user) {
  console.log("save to DB");
  console.log(user);
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log("something happeping wrong during to save databases ", error);
  }
}

export async function signInAccount(user) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log("some happing wrong during sign in process ", error);
  }
}

export async function getCurrentUSer() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw error;
    console.log("in appwrite curr user");
    console.log(currentAccount.$id);
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw error;
    console.log("current user logged in successfully");
    //  console.log(currentUser);
    return currentUser.documents[0];
  } catch (error) {
    console.log(
      "something is happening wrong during getting current user ",
      error
    );
  }
}
export async function getCurrentUSerById(userId) {
  // console.log("m aa gya hu user lene with userid: ");
  //console.log(userId);
  if (!userId) {
    // console.log("userID is not defined");
    return;
  }
  try {
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("$id", userId)]
    );
    if (!currentUser) throw error;
    // console.log("user mila mst");
    return currentUser.documents[0];
  } catch (error) {
    console.log(
      "something is happening wrong during getting current user ",
      error
    );
  }
}
export async function getUserByUserName(username) {
  // console.log("m aa gya hu user lene with userid: ");
  //console.log(userId);
  if (!username) {
    // console.log("userID is not defined");
    return;
  }
  console.log("inside to get user");
  try {
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("username", username)]
    );
    if (!currentUser) throw error;
    console.log(currentUser.documents[0]);
    console.log("user by name mila mst");

    return currentUser.documents[0];
  } catch (error) {
    console.log(
      "something is happening wrong during getting  user by name ",
      error
    );
  }
}

export async function getAllUSer() {
  try {
    // const currentAccount = await account.get();
    // if (!currentAccount) throw error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    if (!currentUser) throw error;
    return currentUser.documents;
  } catch (error) {
    console.log("something is happening wrong during getting all user ", error);
  }
}

export async function signOutAccount() {
  console.log("inside signout");
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log("some happing wrong during sign out process ", error);
  }
}
export async function createStory(post) {
  console.log(post);
  try {
    console.log(" now inside create post");
    const uploadedFile = await uploadFile(post.file[0]);
    // console.log("uploadedfile line no 87");
    console.log(uploadedFile);
    if (!uploadedFile) throw Error;
    const fileUrl = getFilePreview(uploadedFile.$id, post.file[0].type);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    const story = {
      storyImg: fileUrl,
      storyId: uploadedFile.$id,
      createdAt: new Date(),
    };
    // const newpost = JSON.stringify(story);
    post.user.story = JSON.stringify(story);
    console.log("aa gya hu story save krne");

    const setStory = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      post.userId,
      {
        story: post.user.story,
      }
    );

    if (!setStory) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    //await mentionedpeople(postId,post.mentionId,post.userId);
    console.log("end of create story");
    return setStory;
  } catch (error) {
    console.log("something happening wrong during uploading post ", error);
  }
}

export async function deleteStory(user) {
  if (!user.story) return;
  console.log("good m aa gya hu delete krne ok");
  const data = JSON.parse(user.story);
  try {
    const statusCode = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.$id,
      {
        story: "",
      }
    );

    if (!statusCode) throw Error;
    console.log("good  delete ho gya ok ");
    //console.log(data.storyId);

    // const isDeleted = await deleteFile(data.storyId);
    // if (!isDeleted) throw Error;
    // console.log("deletefile");
    console.log(user);
    return { status: "Ok" };
  } catch (error) {
    console.log("something wrong during deleting post ", error);
  }
}

export async function addStoryHighlight(post) {
  if (!post.highlightUrl) return;
  console.log("aa gya hu story hightlight add krne");
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      post.userId
    );

    const existingHighlights = user.highlights || [];
    const newhighlight = {
      highlightUrl: post.highlightUrl,
      highlightTitle: post.highlightTitle,
      createdAt: new Date(),
    };
    // const newpost = JSON.stringify(story);
    const highlight = JSON.stringify(newhighlight);
    const updatedHighlights = [...existingHighlights, highlight];

    const addStory = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      post.userId,
      {
        // highlights:post.highlight,
        highlights: updatedHighlights,
      }
    );
    if (!addStory) throw Error;
    console.log("story added to highlight successfully");
    return addStory;
  } catch (error) {
    console.log(
      "something happening wrong during to save the highlights ",
      error
    );
  }
}

export async function saveTaggedUser(post) {
  try {
    console.log("aa gya");
    const user = await getUserByUserName(post.username);
    console.log(user);
    console.log("mil gya");

    // Fetch the current user document
    const currentUser = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.$id
    );
    currentUser.taggedpost = currentUser.taggedpost || [];

    // Modify the taggedpost array by pushing the new item
    const newpost = JSON.stringify(post.tagpost);
    currentUser.taggedpost.push(newpost);
    // Modify the taggedpost array by pushing the new item
    ///currentUser.taggedpost = [...currentUser.taggedpost, post.tagpost];
    // const taggedpostString = JSON.stringify(currentUser.taggedpost);
    // Update the entire user document
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.$id,
      {
        taggedpost: currentUser.taggedpost,
      }
    );

    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    console.log("I am getting an error in saveTaggedPost", error);
    throw error;
  }
}

export async function createPost(post) {
  console.log(post);

  try {
    // console.log(post?.file[0]);
    // console.log(post.file[0].type);
    console.log(" now inside create post");
    const uploadedFile = await uploadFile(post.file[0]);
    // console.log("uploadedfile line no 87");
    console.log(uploadedFile);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id, post.file[0].type);
    // console.log("img url");
    console.log(fileUrl);
    console.log({ fileUrl });
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array

    const tags =
      post.tags.length > 0 ? post.tags?.replace(/ /g, "").split(",") : [];

    // Create post
    const postId = ID.unique();
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags.length > 0 ? tags : [],
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    // console.log("saved to database yes");
    //  console.log(newPost);
    console.log("curr user", post.userId);
    // console.log("tagged user",post.mentionId);
    console.log("post id", postId);
    //await mentionedpeople(postId,post.mentionId,post.userId);
    console.log("end of create post");
    return newPost;
  } catch (error) {
    console.log("something happening wrong during uploading post ", error);
  }
}
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log("no return from createFile ", error);
  }
}

export function getFilePreview(fileId, fileType) {
  const baseUrl =
    "https://cloud.appwrite.io/v1/storage/buckets/65bd63ef0564b56efb29/files/";

  try {
    if (fileType.startsWith("image/")) {
      // const fileUrl = storage.getFilePreview(
      //   appwriteConfig.bucketId,
      //   fileId,
      //   2000,
      //   2000,
      //   "top",
      //   100
      // );
      // return fileUrl;
      return `${baseUrl}${fileId}/preview?width=2000&height=2000&gravity=top&quality=100&project=65bd2d5b8632edc33269`;
    } else if (fileType.startsWith("video/")) {
      return `${baseUrl}${fileId}/view?project=65bd2d5b8632edc33269&mode=admin`;
    }
  } catch (error) {
    console.log("something wrong during getfilepreview ", error);
  }
}

export async function deleteFile(fileId) {
  console.log(fileId);
  try {
    await storage.deleteFile(appwriteConfig.bucketId, fileId);
    return { status: "ok" };
  } catch (error) {
    console.log("something happening wrong during deleting file ", error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) {
      throw error;
    }
    return posts;
  } catch (error) {
    console.log("something is wrong during fetching data");
  }
}
export async function likePost(postId, likesArray) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log("error ", error);
  }
}
export async function saveComment(post) {
  // console.log("aa gya hu comment save krne");
  // console.log(post.postId);

  try {
    const updatedComment = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentCollectionId,
      ID.unique(),
      {
        user: post.userId,
        comment: post.comment,
        post: post.postId,
      }
    );
    if (!updatedComment) throw Error;
    console.log("comment save hurrah");
    return updatedComment;
  } catch (error) {
    console.log("wrong during to save a commnet ", error);
  }
}

export async function submitChat(chats) {
  if (!chats.chatMsg) return;
  // console.log(chats.currUserId);
  // console.log(chats.roomUserId);
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      chats.currUserId
    );
    const roomObj = user?.chattingroom?.find((object) => {
      const data = JSON.parse(object);
      return data?.userId === chats.roomUserId && data?.roomId;
    });
    const roomId = roomObj ? JSON.parse(roomObj).roomId : null;
    console.log(roomObj);

    console.log(roomId);
    const msg = {
      chatId: uuidv4(),
      chat: chats.chatMsg,
      createdAt: new Date(),
      creator: chats.currUserId,
    };
    const newmsg = JSON.stringify(msg);
    console.log(newmsg);

    if (!roomId) {
      const userdetail = `${chats.currUserId}_${chats.roomUserId}`;

      const doChat = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        ID.unique(),
        {
          chats: [newmsg],
          users: userdetail,
        }
      );
      if (!doChat) throw Error;
      const detail = {
        roomId: doChat.$id,
        userId: chats.roomUserId,
      };
      const details = JSON.stringify(detail);
      const exitingchattingroom = user?.chattingroom || [];

      const newEntryCurr = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        chats.currUserId,
        {
          chattingroom: [details, ...exitingchattingroom],
        }
      );
      const detail2 = {
        roomId: doChat.$id,
        userId: chats.currUserId,
      };
      const details2 = JSON.stringify(detail2);
      const roomuser = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        chats.roomUserId
      );

      const newEntryRoom = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        chats.roomUserId,
        {
          chattingroom: [details2, ...roomuser?.chattingroom],
        }
      );
      if (!newEntryCurr && !newEntryRoom) throw Error;

      return doChat;
    } else {
      const existingdata = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        roomId
      );
      const existingChatting = existingdata?.chats || [];
      const updatedChatting = [newmsg, ...existingChatting];
      const chatting = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        roomId,
        {
          chats: updatedChatting,
        }
      );
      if (!chatting) throw Error;
      return chatting;
    }
  } catch (error) {
    console.log("submitting chat ", error);
  }
}
export async function deleteChatMsg(chats) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      chats.currUserId
    );
    const roomObj = user?.chattingroom?.find((object) => {
      const data = JSON.parse(object);
      return data?.userId === chats?.roomUserId && data?.roomId;
    });
    const roomId = roomObj ? JSON.parse(roomObj).roomId : null;

    const isDeleted = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.chatCollectionId,
      roomId,
      {
        chats: chats.chatting,
      }
    );
    if (!isDeleted) throw Error;
    console.log("deleted chats successfully");
    return { status: "ok" };
  } catch (error) {
    console.log("error in deleting msg ", error);
  }
}
export async function showChat(currUserId, roomUserId) {
  if (!roomUserId || !currUserId) return;

  const queries1 = `${currUserId}_${roomUserId}`;
  const queries2 = `${roomUserId}_${currUserId}`;
  try {
    const roomChat = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.chatCollectionId,
      [Query.equal("users", [queries1, queries2])]
    );
    console.log(roomChat);

    if (roomChat.length === 0) {
      throw new Error("No chat documents found.");
    }
    console.log("chats mili");
    return roomChat;
  } catch (error) {
    console.log("wrong during getting chat ", error);
  }
}

// to delete chatting rooom
// export async function deletechattingroom(userId){
//   try{
//     const isEmpty=await databases.updateDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       userId,
//       {
//         chattingroom:[]
//       }
//     )
//     if(!isEmpty)throw Error;
//     console.log("deleted chat room");

//   }catch(error){
//     console.log("not deleted ",error);
//   }
// }

export async function savePost(postId, userId) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log("wrong during to save a post ", error);
  }
}

export async function getSavedPosts(userId) {
  console.log(userId);
  try {
    const getPost = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId
      // query
    );

    if (!getPost.documents.length) {
      throw new Error("No saved posts found for the user");
    }

    return getPost.documents;
  } catch (error) {
    console.error("Error during retrieval of saved posts:", error);
    throw error;
  }
}

// Make sure to import 'databases' from the correct Appwrite module

export async function deleteSavedPost(savedRecordId) {
  console.log(savedRecordId);
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      savedRecordId
    );
    console.log("inside try delete");
    if (!statusCode) throw Error;

    return { status: "ok" };
  } catch (error) {
    console.error("Error deleting saved post:", error.message);
  }
}
export async function getPostById(postId) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log("something wrong to fetch the post by id", error);
  }
}

export async function updatePost(post) {
  const hasFileToUpdate = post.file.length > 0;
  console.log(post);
  // console.log(post.file[0]);

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };
    const deletefileId = post.imageId;

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id, post.file[0].type);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      // if (hasFileToUpdate) {
      await deleteFile(post.imageId);
      throw Error;
    }

    const isDeleted = await deleteFile(deletefileId);
    if (!isDeleted) throw Error;

    return updatedPost;

    // }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile(user) {
  const uploadedFile = await uploadFile(user.file[0]);

  if (!uploadedFile) throw Error;

  // Get file url
  const fileUrl = getFilePreview(uploadedFile.$id, user.file[0].type);
  // console.log("img url");
  console.log(fileUrl);
  // console.log({ fileUrl });
  if (!fileUrl) {
    await deleteFile(uploadedFile.$id);
    throw Error;
  }
  const deletefileId = user.imageId;
  const oldUrl = user.imageUrl;
  const filteredUse = {
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    imageUrl: fileUrl,
    imageId: uploadedFile.$id,
  };
  if (!user.userId) {
    console.error("User ID is missing. Cannot update profile.");
    return;
  }

  try {
    console.log("inside try");

    const updatedProfile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      filteredUse
    );

    if (!updatedProfile) {
      console.error("Failed to update profile");
      throw new Error("Failed to update profile");
    }
    if (!oldUrl.includes("avators")) {
      const isDeleted = await deleteFile(deletefileId);
      if (!isDeleted) throw Error;
    }
    console.log("Profile updated successfully");
    return updatedProfile;
  } catch (error) {
    console.error("Error during profile update:", error);
  }
}

export async function updateFollowProfile(user) {
  console.log(user);
  if (!user.$id) {
    console.error("User ID is missing. Cannot update profile.");
    return;
  }
  const filteredUser = {
    followers: user.followers,
    following: user.following,
  };

  try {
    console.log("inside try");

    const updatedProfile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.$id,
      filteredUser
    );

    if (!updatedProfile) {
      console.error("Failed to update profile");
      throw new Error("Failed to update profile");
    }

    console.log("Profile updated successfully");
    return updatedProfile;
  } catch (error) {
    console.error("Error during follow profile update:", error);
  }
}

// export async function updateProfile(userId, updatedProfile) {
//   try {
//     const query = new Query();
//     query
//       .setFilters([
//         `userId=${userId}`
//         // Add more filters if needed
//       ]);

//     const updatedUser = await appwrite.database.updateDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       query,
//       updatedProfile
//     );

//     if (!updatedUser) {
//       console.error("Failed to update user profile");
//       throw new Error("Failed to update user profile");
//     }

//     console.log("User profile updated successfully");
//     return updatedUser;
//   } catch (error) {
//     console.error("Error during user profile update:", error);
//     throw error;
//   }
// }

// ============================== DELETE POST
export async function deletePost(postId, imageId) {
  // console.log(postId);
  // console.log(imageId);
  if (!postId || !imageId) return;
  console.log("good str");

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!statusCode) throw Error;
    console.log("good yha tk");
    const isDeleted = await deleteFile(imageId);
    if (!isDeleted) throw error;
    console.log("deletefile");
    return { status: "Ok" };
  } catch (error) {
    console.log("something wrong during deleting post ", error);
  }
}

export async function getInfinitePosts({ pageParam }) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPosts(searchTerm) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      //appwriteConfig.postCollectionId,
      appwriteConfig.userCollectionId,
      [Query.search("name", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function searchUsers(searchTerm) {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      //appwriteConfig.postCollectionId,
      appwriteConfig.userCollectionId,
      [Query.search("name", searchTerm)]
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}
