"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
  

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
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CreateInternalForm } from "./create-internalhr";

interface Order {
  name: string;
  email: string;
  companyName: string;
  created: string;
}

// Sample JSON data conforming to the Order interface
const sampleData: Order[] = [
  {
    name: "Laser Lemonade Machine",
    email: "guru@gamil.com",
   companyName: "Comapny 1",
    created: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    email: "guru@gamil.com",
   companyName: "Comapny 1",
    created: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    email: "guru@gamil.com",
   companyName: "Comapny 1",
    created: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    email: "guru@gamil.com",
   companyName: "Comapny 1",
    created: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    email: "guru@gamil.com",
   companyName: "Comapny 1",
    created: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    email: "guru@gamil.com",
   companyName: "Comapny 1",
    created: "2023-07-12 10:42 AM",
  },
  {
    name: "Laser Lemonade Machine",
    email: "guru@gamil.com",
   companyName: "Comapny 1",
    created: "2023-07-12 10:42 AM",
  },


];


enum BadgeVariant {
  Default = "default",
  Destructive = "destructive",
  Outline = "outline",
  Secondary = "secondary",
  Pending = "pending",
  Success = "success",
  OutlineDestructive = "outlinedestructive",
}

export default function InternalTable() {
  const router = useRouter();

  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  // Function to handle download report
  const handleDownloadReport = () => {
   
    const pdfUrl = "/pdf/smaple.pdf";
  
   
    const anchorElement = document.createElement("a");
  
    
    anchorElement.href = pdfUrl;
  
   
    anchorElement.download = "report.pdf";
  
   
    anchorElement.click();
  
   
    anchorElement.remove();
  };
  
  return (
    <main className="grid flex-1  items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
           
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
         < CreateInternalForm/>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Internal HR</CardTitle>
              <CardDescription>
                Manage your HR and view their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden lg:table-cell">
                     Email
                    </TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Created
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData
                    .slice(startIndex, endIndex)
                    .map((order, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {order.name}
                        </TableCell>
                        <TableCell className="font-medium hidden lg:table-cell">
                          {order.email}
                        </TableCell>
                        <TableCell className="hidden  lg:table-cell">
                          {order.companyName}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {order.created}
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
                            <DropdownMenuItem >Edit</DropdownMenuItem>
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
              {/* <div className="text-xs text-muted-foreground">
                Showing <strong>{startIndex + 1}-{Math.min(endIndex, sampleData.length)}</strong> of <strong>{sampleData.length}</strong> Orders
              </div> */}
              {/* Pagination controls */}
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">{currentPage}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
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
    </main>
  );
}
