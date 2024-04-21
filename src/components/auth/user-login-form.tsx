'use client'

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import * as z from "zod";
import {   useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}



// Define Zod schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
       .string()
       .min(8),
}); 


export function UserLoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
  //   const userData = {
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   };

  //   try {
  //     const response = await fetch("/api/users/sign-in", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (!response.ok) {
  //       const data = await response.json();
  //       setError(data.message);
  //       return;
  //     }
       
  //     toast({
  //       description: "Welcome!!",
  //     }); 
  //     setTimeout(() => {
  //     router.push("/internal/dashboard");
  //   }, 3000); 
  //     const data = await response.json();
  //     console.log(data); // Handle success response here
  //   } catch (error) {
  //     console.error("Error Signing in", error);
  //     // Handle error here
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="grid gap-6">
       <Form {...form}>
      <form  onSubmit={form.handleSubmit(handleSubmit)} 
      className="space-y-3">
     
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
                    <Input placeholder="Enter password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <p className="flex mb-2 justify-start text-sm text-muted-foreground">
            <Link
              href="/forget-password"
              className="underline underline-offset-4 hover:text-primary"
            >
              Forgot password
            </Link>{" "}
          </p>

          <Button className="w-full flex">
            Login
          </Button>
       
      </form>
      </Form>
    </div>
  );
}
