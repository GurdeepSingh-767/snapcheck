"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, PlusCircle, Router } from "lucide-react";
import Link from "next/link";
import { InternalHrSchema } from "@/schemas/signUpSchema";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

// Define Zod schema for form validation
const formSchema = z
  .object({
    fullName: z
      .string()
      .min(4, { message: "Invaild Name" }),
    email: z.string().email({ message: "Invalid email address" }),
    companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters long" }),
  })

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function  CreateInternalForm() {

  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };


  return (
<>    <Dialog>
    <DialogTrigger className="flex gap-2 bg-primary px-3 cursor-pointer  py-1 rounded-md"><PlusCircle/>Create HR</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new internal HR</DialogTitle>
        <DialogDescription>
        <div className="grid gap-6">
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="fullName"
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
          name="companyName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter company name"
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

     
        
      

        <Button className="w-full" type="submit">
          <CheckIcon className="mr-2 h-4 w-4" /> Create
        </Button>
      </form>
    </Form>
  </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
    
    </>

  );
}