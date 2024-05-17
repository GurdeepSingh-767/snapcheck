'use client'
import React, { useEffect, useState } from "react";
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
    hr: any; 
  }


  const fetchData = async (endpoint: string) => {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    return response.json();
  };



const OPTIONS: Option[] = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' },
  { label: 'Item 5', value: 'item5', disable: true },
  { label: 'Item 6', value: 'item6', disable: true },
 
];

export function UpdateInternalHrSheet({ open, onOpenChange, hr }: UpdateInternalHrSheetProps) {


  const form = useForm<z.infer<typeof internalFormSchema>>({
    resolver: zodResolver(internalFormSchema),
    defaultValues: {
      fullName: hr.name,
      email: hr.email,
      companyName: hr.company,
      role:hr.role,
      planAccess:[],
      reportAccess: hr.report_access.toString(),
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {

    console.log("Selected hr:",form);
    const fetchPlansAndProducts = async () => {
      try {
        const plansData = await fetchData('/api/plan');
        const planOptions = plansData.data.map((plan: { planName: string, _id: string }) => ({
          label: plan.planName,
          value: plan._id,
        }));
        setOptions(planOptions);

        // Set the form default values including the selected items
        form.setValue('planAccess', hr.plan.map((planId: string) => ({
            label: planOptions.find((option: { value: string; }) => option.value === planId)?.label || '',
            value: planId,
        })));

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchPlansAndProducts();
}, [hr, form]);

  const handleSubmit = async (values: z.infer<typeof internalFormSchema>) => {
    try {
      const planIds = values.planAccess.map(item => item.value);
        const updatedHRData = {
            ...hr,
            id:hr._id,
            name: values.fullName,
            email: values.email,
            role: values.role,
            company: values.companyName,
            plan:planIds,
            report_access:values.reportAccess
        };

        fetch(`/api/hr`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedHRData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('HR updated:', data);
            // You can add logic to handle success response, e.g., close the modal
            onOpenChange(false);
        })
        .catch(error => {
            console.error('Error updating HR:', error);
            // You can add logic to handle error response
        });
    } catch (error) {
        console.error('Error updating HR:', error);
    }
  };
  
  if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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
                  defaultOptions={options}
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
              <FormLabel>Select report access</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report access" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                
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
