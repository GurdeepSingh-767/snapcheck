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
import { customerSchema } from "@/schemas/customerSchema"
import { toast } from "@/components/ui/use-toast"
export function CreateCustomer() {
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
        })
      }


  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            
      <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter the company name" {...field} />
                  </FormControl>
                  <FormDescription>  
                  </FormDescription>
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
                    <Input type="email" placeholder="Enter the company email" {...field} />
                  </FormControl>
                  <FormDescription>  
                  </FormDescription>
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
                    <Input type="text" placeholder="Enter the contract id" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="costRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost rate </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter the price" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}