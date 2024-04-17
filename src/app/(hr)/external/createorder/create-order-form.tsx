"use client";

import * as React from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateOrderForm() {
  return (
    <div className="flex flex-col  p-4 w-full lg:w-3/4 sm:gap-4 sm:py-4 ">
      <Card>
        <CardTitle className=" text-xl border-b px-6 py-4">
          Create new order
        </CardTitle>
        <CardContent>
          <form className="space-y-4">
            <h3 className="text-xl"></h3>
            <Separator />

            <div className=" flex-cols grid  lg:flex gap-2  ">
              <div className="w-full grid gap-2  lg:w-1/2">
                <Label htmlFor="campany">Select company</Label>
                <Select>
                  <SelectTrigger id="campany">
                    <SelectValue
                      placeholder="Select 
Company"
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="comapany1">Company 1</SelectItem>
                    <SelectItem value="comapany2">Company 2</SelectItem>
                    <SelectItem value="comapany3">Company 3</SelectItem>
                    <SelectItem value="comapany4">Company 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full grid  gap-2  lg:w-1/2">
                <Label htmlFor="plan">Select plan</Label>
                <Select>
                  <SelectTrigger id="plan">
                    <SelectValue
                      placeholder="Select 
Plan"
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="plan1">Plan 1 </SelectItem>
                    <SelectItem value="plan2">Plan 2</SelectItem>
                    <SelectItem value="plan3">Plan 3</SelectItem>
                    <SelectItem value="plan4">Plan 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className=" flex-cols grid  lg:flex gap-2   ">
              <div className="w-full grid gap-2  lg:w-1/2">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="fristname"
                  placeholder="Enter first name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="text"
                  autoCorrect="off"
                  // disabled={isLoading}
                />
              </div>

              <div className="w-full grid gap-2  lg:w-1/2">
                <Label htmlFor="lasttname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Enter  last name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="text"
                  autoCorrect="off"
                  // disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                // disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contactus">Contact Us</Label>
              <Input
                id="contactus"
                placeholder="Enter  contact information"
                type="tel"
                autoComplete="tel"
                autoCapitalize="none"
                autoCorrect="off"
                // disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="govtID">Government Identification No</Label>
              <Input
                id="govtID"
                placeholder="Enter  government ID"
                type="number"
                autoComplete="govt-id"
                autoCapitalize="none"
                autoCorrect="off"
                // disabled={isLoading}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
