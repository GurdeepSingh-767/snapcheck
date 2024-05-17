'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
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
import { planSchema } from "@/schemas/planSchema"


interface UpdatePlanSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan: any; 
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

export function UpdatePlanSheet({ open, onOpenChange, plan }: UpdatePlanSheetProps) {
    
      const [options, setOptions] = useState<Option[]>([]);
      const [plans, setPlans] = useState([]);
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const form = useForm<z.infer<typeof planSchema>>({
        resolver: zodResolver(planSchema),
        defaultValues: {
          plan: plan.planName,
          price: plan.planPrice,
          items:[]
        },
      });

      useEffect(() => {

        
        const fetchPlansAndProducts = async () => {
          try {
            const productsData = await fetchData('/api/item');
            const productOptions = productsData.data.map((product: { productName: string, _id: string }) => ({
              label: product.productName,
              value: product._id,
            }));
            setOptions(productOptions);

            // Set the form default values including the selected items
            form.setValue('items', plan.products.map((productId: string) => ({
                label: productOptions.find((option: { value: string; }) => option.value === productId)?.label || '',
                value: productId,
            })));

            setLoading(false);
          } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch data');
            setLoading(false);
          }
        };

        fetchPlansAndProducts();
    }, [plan, form]);

      function onSubmit(values: z.infer<typeof planSchema>) {
        try {
          const productIds = values.items.map(item => item.value);
            const updatedPlanData = {
                ...plan,
                id:plan._id,
                planName: values.plan,
                planPrice: values.price,
                products: productIds
            };

            fetch(`/api/plan`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPlanData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Plan updated:', data);
                // You can add logic to handle success response, e.g., close the modal
                onOpenChange(false);
            })
            .catch(error => {
                console.error('Error updating plan:', error);
                // You can add logic to handle error response
            });
        } catch (error) {
            console.error('Error updating plan:', error);
        }
    }
      if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
  return (
   
    <Sheet onOpenChange={onOpenChange} open={open}>
      
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Plan</SheetTitle>
          <SheetDescription>Update the plan details and save the changes</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-screen ">
        <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-5">
            
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan name</FormLabel>
                  <FormControl>
                    <Input  placeholder="Enter the plan name" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={options}
                  placeholder="Select a item"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter the price" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
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
