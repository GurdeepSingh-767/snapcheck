'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long")
      .max(32, "The password must be a maximun 32 characters"),

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

export default function ChnagePassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  const searchParams = useSearchParams();
  const router= useRouter();
  const [user, setUser] = useState({name:"",id:""});

  const userId = searchParams.get('userId');
    const token = searchParams.get('token');
    console.log("userId",userId);
    console.log("token",token);
    async function check(){
      const response:any = await fetch("/api/users/check-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId,token}),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log("data",data);
        
        return;
      }
      const data = await response.json();
      setUser(data.user);
      
    }

  useEffect(() => {
    

    check();
    
  }, [check]);
  
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.password);

    const response:any = await fetch("/api/users/change-pass", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId:user.id,password:values.password}),
    });

    if (!response.ok) {
      const data = await response.json();
      console.log("data",data);
      
      return;
    }
    const data = await response.json();
    router.push('/login');

  };

  return (
    <>
      <div className="flex justify-center ">
        <Link href="/" className="font-bold py-4 text-2xl lg:text-4xl">
          Snapcheck
        </Link>
      </div>
      <div className="flex justify-center p-4 items-center h-screen">
        <Card className="w-[550px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Change your password {user.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Password"
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
                        <FormLabel>Password confirm</FormLabel>
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

                <Button type="submit" className="w-full">
                  Change password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}