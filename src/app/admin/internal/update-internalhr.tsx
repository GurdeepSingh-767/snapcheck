'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { internalFormSchema } from "@/schemas/internalFormSchema";
import { CheckIcon } from "lucide-react";



interface UpdateInternalHrSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan: any; 
  }




const OPTIONS: Option[] = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' },
  { label: 'Item 5', value: 'item5', disable: true },
  { label: 'Item 6', value: 'item6', disable: true },
 
];

export function UpdateInternalHrSheet({ open, onOpenChange, plan }: UpdateInternalHrSheetProps) {


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
   
    <Sheet onOpenChange={onOpenChange} open={open}>
      
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Internal HR</SheetTitle>
          <SheetDescription>Update the HR details and save the changes</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-screen ">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 p-5">
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
          </ScrollArea>
      </SheetContent>
      
    </Sheet>
  
  );
}
