"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { customerSchema } from "@/schemas/customerSchema";
import { toast } from "@/components/ui/use-toast";

interface UpdateCustomerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateCustomerSheet({
  isOpen,
  onClose,
}: UpdateCustomerSheetProps) {
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      contractId: "",
      costRate: 0,
    },
  });

  function onSubmit(data: z.infer<typeof customerSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    onClose(); // Close the sheet after submission
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Customer</SheetTitle>
          <SheetDescription>
            Update the customer details and save the changes
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-screen">
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-5"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter the company email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contractId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Id</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the contract id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="costRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost rate</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save changes</Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
