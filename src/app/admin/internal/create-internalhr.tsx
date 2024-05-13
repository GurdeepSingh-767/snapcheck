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
  import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { internalFormSchema } from "@/schemas/internalFormSchema";


  const OPTIONS: Option[] = [
    { label: 'Plan 1', value: 'item1' },
    { label: 'Plan 2', value: 'item2' },
    { label: 'Plan 5', value: 'item5', disable: true },
    { label: 'Plan 6', value: 'item6', disable: true },
   
  ];

 



export function  CreateInternalForm() {

  const router = useRouter();

  const form = useForm<z.infer<typeof internalFormSchema>>({
    resolver: zodResolver(internalFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof internalFormSchema>) => {
    console.log({ values });
  };


  return (
<> 
 <Dialog>
<DialogTrigger asChild>
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Create HR
                    </span>
                  </Button>
                </DialogTrigger>
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


<FormField
          control={form.control}
          name="planAccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Access</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={OPTIONS}
                  placeholder="Select a plan"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


  <FormField
          control={form.control}
          name="reportAccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select license type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a license type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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