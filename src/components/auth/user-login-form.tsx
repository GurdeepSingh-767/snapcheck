"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);
    
        const formData = new FormData(event.target as HTMLFormElement);
        const userData = {
          email: formData.get("email"),
          password: formData.get("password"),
        };
    
        try {
          const response = await fetch("/api/users/sign-in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
    
          if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            return;
          }
          router.push("/internal/dashboard");
          const data = await response.json();
          console.log(data); // Handle success response here
        } catch (error) {
          console.error("Error Signing in", error);
          // Handle error here
        } finally {
          setIsLoading(false);
        }
      }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {error && (
        <p className="text-red-500">{error}</p> // Display error message if present
      )}
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">

                    

                   
                    <div className="grid gap-2">
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            autoComplete="current-password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>

                   

                    
                    <div className="grid gap-2">
                    <Label htmlFor="framework">Service</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select of service" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="external">External HR</SelectItem>
                  <SelectItem value="internal">Internal HR</SelectItem>
                  <SelectItem value="candidate">Candidate</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
                    </div>

                    <p className="flex mb-2 justify-start text-sm text-muted-foreground">
                    <Link
                href="/forget-password"
                className="underline underline-offset-4 hover:text-primary"
              >
                Forgot password
              </Link>{" "}
            
            </p>

               
                    <Button className="w-full flex">
                    <Link href="/internal/dashboard">
     Login
          </Link>
        </Button>

                  
                </div>
            </form>
           
          
        </div>
    );
}