"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, Router } from "lucide-react";
import Link from "next/link";
import { InternalHrSchema } from "@/schemas/signUpSchema";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define Zod schema for form validation
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(4, { message: "First name must be at least 4 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "The password must be at least 8 characters long" })
      .max(32, { message: "The password must be a maximun 32 characters" }),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const [error, setError] = useState<string>("");
  // const router = useRouter();
  // const { toast } = useToast();

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const password = formData.get("password") as string;
  //   const confirmPassword = formData.get("confirmPassword") as string;
  //   const service = formData.get("service") as string;

  //   if (password !== confirmPassword) {
  //     setError("Password and Confirm Password must match");
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     InternalHrSchema.parse({
  //       name: formData.get("name"),
  //       email: formData.get("email"),
  //       password: formData.get("password"),
  //     });
  //   } catch (error) {
  //     console.error("Error registering user", error);
  //     if (error instanceof Error) {
  //       setError(error.message);
  //       setIsLoading(false);
  //       return;
  //     } else {
  //       setError("Unknown error occurred");
  //       setIsLoading(false);
  //       return;
  //     }
  //   }

  //   const userData = {
  //     name: formData.get("name"),
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   };

  //   try {
  //     const response = await fetch("/api/users/sign-up", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to register user");
  //     }

  //      toast({

  //       description: "Your account has been created successfully.",
  //     });

  //  setTimeout(() => {
  //   router.push("/login");
  // }, 3000);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error registering user", error);

  //      toast({
  //       variant: "destructive",
  //       title: "Uh oh! Something went wrong.",
  //       description: "There was a problem with your request.",
  //       action: <ToastAction altText="Try again" onClick={onSubmit}>Try again</ToastAction>,
  //     });

  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="grid gap-6">
      {/* {error && (
        <p className="text-red-500">{error}</p> // Display error message if present
      )} */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter full name"
                      type="text"
                      {...field}
                      autoCapitalize="none"
                      autoComplete="text"
                      autoCorrect="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confrim password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking button, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <Button className="w-full" type="submit">
            <CheckIcon className="mr-2 h-4 w-4" /> Signup
          </Button>
        </form>
      </Form>
    </div>
  );
}
