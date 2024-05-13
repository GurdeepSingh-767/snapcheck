"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PlusCircle, MoreHorizontal } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PaginationPrevious from "./paginationPrevious";
import { CreatePlan } from "./create-plan";
import { UpdatePlanSheet } from "./update-plan";


// Sample data
// Sample data
const sampleData = [
    {
      id: 1,
      name: "Plan 1",
      items: "item 2",
      created: "2023-05-12",
    },
    {
      id: 2,
      name: "Plan 2",
      items: "item 1 , item 2 item",
      created: "2023-05-11",
    },
    {
      id: 3,
      name: "Plan 3",
      items: "item 1 , item 2 item 3",
      created: "2023-05-10",
    },
    {
      id: 4,
      name: "Plan 4",
      items: "item 1 , item 2 item 3",
      created: "2023-05-10",
    },
    {
      id: 5,
      name: "Plan 5",
      items: "item 1 , item 2 item 3",
      created: "2023-05-10",
    },
    {
      id: 6,
      name: "Plan 6",
      items: "item 1 , item 2 item 3",
      created: "2023-05-10",
    },
    {
      id: 7,
      name: "Plan 7",
      items: "item 1 , item 2 item 3",
      created: "2023-05-10",
    },
    {
      id: 8,
      name: "Plan 8",
      items: "item 1 , item 2 item 3",
      created: "2023-05-10",
    },
    {
      id: 9,
      name: "Plan 9",
      items: "item 1 , item 2 item 3",
      created: "2023-05-10",
    },
  ];
  


  export default function PlansTable() {
    const router = useRouter();
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const currentData = sampleData.slice(startIndex, endIndex);
  
    // Function to handle page change
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
  
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
  
    const handleEditClick = (plan:any) => {
      setSelectedPlan(plan);
      setIsEditDialogOpen(true);
    };
  
    return (
      <main className="grid flex-1  items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="draft" className="hidden sm:flex">
                Draft
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Create plan
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create plan</DialogTitle>
                  </DialogHeader>
                  <CreatePlan />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Plan</CardTitle>
                <CardDescription>
                  Manage your plan and view their statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan name</TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Plan items
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Created
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell className="font-medium hidden lg:table-cell">
                          {plan.items}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {plan.created}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditClick(plan)}>
                                Edit
                              </DropdownMenuItem>
                              <Separator />
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem className="mr-3">
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
  
        {selectedPlan && (
         
              <UpdatePlanSheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} plan={selectedPlan} />
          
        )}
      </main>
    );
  }