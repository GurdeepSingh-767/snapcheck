import React, { useEffect, useState } from "react";
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

// Function to fetch data from API
const fetchData = async (endpoint: string) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};

export default function PlansTable() {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchPlansAndProducts = async () => {
      try {
        const plansData = await fetchData('/api/plan');
        const productsData = await fetchData('/api/item');
        setPlans(plansData.data);
        setProducts(productsData.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchPlansAndProducts();
  }, [plans]);

  const getProductNames = (productIds: any[]) => {
    return productIds.map(id => {
      const product:any = products.find((product:{ _id: string}) => product._id === id);
      return product ? product.productName : id;
    }).join(", ");
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = plans.slice(startIndex, endIndex);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
  
    const handleEditClick = (plan:any) => {
      setSelectedPlan(plan);
      setIsEditDialogOpen(true);
    };

    const handleDeleteClick = async (planId: string) => {
      if (confirm('Are you sure you want to delete this plan?')) {
        try {
          const id ={id:planId};
          const response = await fetch(`/api/plan/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(id),
          });
          if (response.ok) {
            setPlans(plans.filter((plan:{_id:string}) => plan._id !== planId));
            alert('Plan deleted successfully');
          } else {
            alert('Failed to delete plan');
          }
        } catch (error) {
          console.error('Error deleting plan:', error);
          alert('Failed to delete plan');
        }
      }
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
                    <TableHead className="hidden lg:table-cell">Plan items</TableHead>
                    <TableHead className="hidden lg:table-cell">Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((plan:any) => (
                    <TableRow key={plan._id}>
                      <TableCell className="font-medium">{plan.planName}</TableCell>
                      <TableCell className="font-medium hidden lg:table-cell">
                        {getProductNames(plan.products)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(plan.createdAt).toLocaleDateString()} {/* Assuming createdAt is a Date object */}
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
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(plan._id)}>
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

      {isEditDialogOpen && (
          <UpdatePlanSheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} plan={selectedPlan} />
      )}
    </main>
  );
}
