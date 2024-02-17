import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import {
  useGetCurrentUser,
  useUpdateProfile,
} from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ProfileValidation } from "@/lib/validation";
import { Input } from "@/components/ui/input";
// import FileUploader from "@/components/shared/FileUploader";
import ProfileUploader from "@/components/shared/ProfileUploader";

function ProfileUpdateFrom(post) {
  const { toast } = useToast();
  const { data: user } = useGetCurrentUser();
  const navigate = useNavigate();
  const { mutateAsync: updateProfile, isPending: isLoadingUpdate } =
    useUpdateProfile();

  const form = useForm({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      name: user ? user?.name : "",
      username: user ? user?.username : "",
      email: user ? user?.email : "",
      bio: user?.bio ? user.bio : "",
      file: [],
    },
  });

  async function onSubmit(values) {
    console.log(values);
    
    const updatedProfile = await updateProfile({
      ...values,
      imageUrl: user.imageUrl,
      imageId: user.imageId,
      userId: user.$id,
    });
   console.log(user.imageUrl);
    if (!updatedProfile) {
      toast({ title: "please try again error in updating beta" });
    }
    console.log(user);
    return navigate(`/profile/${user.$id}`);
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full mt-1"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">

                </FormLabel>
                <FormControl>
                  <ProfileUploader
                    fieldChange={field.onChange}
                    mediaUrl={user?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" bg-primary-500 w-1/3 ml-[17.5rem]">
            {isLoadingUpdate ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default ProfileUpdateFrom;
