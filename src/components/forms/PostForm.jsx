import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Input } from "../ui/input";
import { PostValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import {
  useCreatePost,
  useGetUserByUsername,
  useSaveTaggedUser,
  // useDeletePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutation";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

function PostForm({ post, action }) {
  const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

    const { mutateAsync: saveTaggedUser, isPending: isSavingPost } =
    useSaveTaggedUser();
   

  // const { mutateAsync: deletePost, isPending: isLoading } = useDeletePost();
  //const [mention, setMention] = useState("");
//  //const [userByUsername, setUserByUsername] = useState("");
 // const {data: getByUsername, refetch, isLoading, isError } = useGetUserByUsername(mention || "");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await refetch();
  //     console.log("getusername mila");
  //   }
  
  //     fetchData();
    
  // }, [mention,refetch]);
  // useEffect(() => {
  //   if (mention) {
  //     refetch();
  //   }
  // }, [mention, refetch]);
 
  const { toast } = useToast();
  const { user } = useUserContext();
  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
      // mention: post ? post?.mention?.join(",") : "",
      mention:""
    },
  });


  async function onSubmit(values) {
    try{

 

    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
       // mentionedId:getByUsername.$id
       
      });
      if (!updatedPost) {
        toast({ title: "please try again" });
      }
      //console.log(user);
      return navigate(`/posts/${post.$id}`);
    }
    
    const newPost = await createPost({
      ...values,
      userId: user.id,
     // mentionedId:getByUsername?.$id
    });
    if (!newPost) {
      toast({
        title: "please try again",
      });
    }
    // console.log(getByUsername?.$id);
    
    console.log(newPost);
    console.log("m aa gya hu");
   const newtagger= await saveTaggedUser(
      {
      
       tagpost:   {
         postId:newPost.$id,
        userId: user.id,
       },
       username:values.mention,
      }
      );
      // setTagpost((prevpost)=> ( [...prevpost,{
      //  postId:newPost.$id,
      //  userId: user.id,
    //  }]))
  //   console.log(newtagger);
  //   console.log("m aa gya hu2");
  //   console.log(user);

    navigate("/");
  //  console.log("update nhi ho rha ");

}catch(e){
  console.log("error in create user");
}
    // console.log("i am saving post in database");
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full max-w-5xl mx-8"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add tags ( Seprated by comma , )
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Coding, Learning, Art"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        {
           action === "Create" &&
        
        <FormField
          control={form.control}
          name="mention"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Mention people ( Seprated by comma , )
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Coding, Learning, Art"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
          }
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => {
              navigate(`/posts/${post.$id}`);
            }}
          >
            cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || (isLoadingUpdate && "Loading...")}
            {action} post
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
