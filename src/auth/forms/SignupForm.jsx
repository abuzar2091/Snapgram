import { Button } from "@/components/ui/button";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// import { z } from "zod"
import { useForm } from "react-hook-form";
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
// import { createUserAccount } from "@/lib/appwrite/api";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
// const formSchema = z.object({
//     username: z.string().min(2).max(50),
//   })

function SignupForm() {
  // const isLoading = false;
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const form = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    //console.log(values);

    const newUser = await createUserAccount(values);
    if (!newUser) {
      toast({
        title: "Sign Up failed, Please Try again",
      });
    }
    const session = await signInAccount(values);
    // console.log(newUser);
    // console.log(session);
    if (!session) {
      toast({
        title: "Sign In1 session not created failed, Please Try again",
      });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign In2 failed, Please Try again",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col">
        <img
          src="/assets/images/logo.svg"
          className="mt-0 lg:mt-6"
          height={2}
        />
        <h2 className="h3-bold  md:h2-bold lg:pt-2 sm:pt-0">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-0">
          To use Snapgram enter your detail
        </p>
        {/* <img src="/assets/images/logo.svg" /> */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full mt-1"
        >
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary mt-2">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <p
          className="text-small-regular text-light-2
        text-center mt-2"
        >
          Already have an account?
          <Link
            to={"/sign-in"}
            className="text-primary-500 text-small-semibold ml-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </Form>
  );
}

export default SignupForm;
