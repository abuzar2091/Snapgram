import { z } from "zod";
export const SignUpValidation = z.object({
  name: z.string().min(3,{message:"To Short"}),
  username: z.string().min(3,{message:"To Short"}),
  email: z.string().min(5,{message:"To Short"}),
  password: z.string().min(8,{message:"Password must be atleast 4 character"})
});
export const SignInValidation = z.object({
  email: z.string().min(5,{message:"To Short"}),
  password: z.string().min(8,{message:"Password must be atleast 4 character"})
});

export const PostValidation = z.object({
  caption:z.string().min(5).max(2200),
  location:z.string().min(2).max(100),
  file:z.custom(),
  tags:z.string(),
 mention:z.string()
});

export const CreateStoryValidation = z.object({
  file:z.custom(),
});
export const ProfileValidation = z.object({
    name: z.string().min(3,{message:"To Short"}),
    username: z.string().min(3,{message:"To Short"}),
    email: z.string().min(5,{message:"To Short"}),
     bio: z.string().min(0),
     file:z.custom(),
  });