import { Client, Account, Databases, Storage, Avatars } from "appwrite";



export const appwriteConfig = {
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  saveCollectionId: String(import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID),
  userCollectionId: String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
  postCollectionId: String(import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID),
  commentCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
  taggedCollectionId: String(import.meta.env.VITE_APPWRITE_TAGGED_COLLECTION_ID),
  
};
export const client = new Client();

client.setEndpoint(appwriteConfig.appwriteUrl);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
