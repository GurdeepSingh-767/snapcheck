"use cleint" 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { planSchema } from "@/schemas/planSchema"
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

// const OPTIONS: Option[] = [
//     { label: 'Item 1', value: 'item1' },
//     { label: 'Item 2', value: 'item2' },
//     { label: 'Item 5', value: 'item5', disable: true },
//     { label: 'Item 6', value: 'item6', disable: true },
   
//   ];

export function CreatePlan() {
    const form = useForm<z.infer<typeof planSchema>>({
        resolver: zodResolver(planSchema),
        defaultValues: {
          plan: "",
          price: 0,
        },
      });
      const router = useRouter();
      const [options, setOptions] = useState<Option[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/item'); // Adjust the endpoint as necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                const productOptions = data.data.map((product: { productName: string, _id: string }) => ({
                    label: product.productName,
                    value: product._id,
                }));
                setOptions(productOptions);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

      async function onSubmit(values: z.infer<typeof planSchema>) {
        
        console.log(values);
        try {
          const productIds = values.items.map(item => item.value);
          const response = await fetch('/api/plan', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  planName: values.plan,
                  planPrice: values.price,
                  products: productIds,
              }),
          });

          const data = await response.json();
          if (!response.ok) {
              throw new Error(data.message || 'Failed to create plan');
          }

          console.log('Plan created:', data);
          router.push('/admin/dashboard');
      } catch (error) {
          console.error('Error creating plan:', error);
      }
      }

      if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}