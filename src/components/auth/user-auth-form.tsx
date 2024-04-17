"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CheckIcon, Router } from "lucide-react";
import Link from "next/link";
import { InternalHrSchema } from "@/schemas/signUpSchema";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const service = formData.get("service") as string;

    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match"); // Set error message
      setIsLoading(false);
      return;
    }

    try {
      InternalHrSchema.parse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
    } catch (error) {
      console.error("Error registering user", error);
      if (error instanceof Error) {
        setError(error.message);
        setIsLoading(false);
        return;
      } else {
        setError("Unknown error occurred");
        setIsLoading(false);
        return;
      }
    }

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/users/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      router.push("/login");
      const data = await response.json();
      console.log(data); // Handle success response here
    } catch (error) {
      console.error("Error registering user", error);
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
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
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
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="password"
              name="confirmPassword"
              placeholder=" Confirm  Password"
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

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking button, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <Button className="w-full">
            <CheckIcon className="mr-2 h-4 w-4" /> Signup
          </Button>
        </div>
      </form>
    </div>
  );
}
