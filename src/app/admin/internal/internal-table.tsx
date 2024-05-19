import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CreateInternalForm } from "./create-internalhr";
import { UpdateInternalHrSheet } from "./update-internalhr";
import { useEffect, useState } from "react";


const fetchData = async (endpoint: string) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};

export default function InternalTable() {
  const router = useRouter();
  const [HRs, setHRs] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedHR, setSelectedHR] = useState(null);

  useEffect(() => {
    const fetchPlansAndProducts = async () => {
      try {
        const hrsData = await fetchData('/api/hr');
        // const productsData = await fetchData('/api/item');
        // setPlans(plansData.data);
        setHRs(hrsData.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchPlansAndProducts();
  }, [HRs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (hr:any) => {
    setSelectedHR(hr);
    console.log("selected hr from table: ",selectedHR);
    
    setIsUpdateOpen(true);
  };

  const handleDeleteClick = async (hrId: string) => {
    if (confirm('Are you sure you want to delete this HR?')) {
      try {
        const id ={id:hrId};
        const response = await fetch(`/api/hr/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
        });
        if (response.ok) {
          setHRs(HRs.filter((hr:{_id:string}) => hr._id !== hrId));
          alert('HR deleted successfully');
        } else {
          alert('Failed to delete HR');
        }
      } catch (error) {
        console.error('Error deleting HR:', error);
        alert('Failed to delete HR');
      }
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <CreateInternalForm />
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Internal HR</CardTitle>
              <CardDescription>Manage your HR and view their details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead className="hidden lg:table-cell">Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {HRs.slice(startIndex, endIndex).map((order:any, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{order.name}</TableCell>
                      <TableCell className="font-medium hidden lg:table-cell">{order.email}</TableCell>
                      <TableCell className="hidden lg:table-cell">{order.company}</TableCell>
                      <TableCell className="hidden lg:table-cell">{order.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditClick(order)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(order._id)}>Delete</DropdownMenuItem>
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
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">{currentPage}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {selectedHR && (
        <UpdateInternalHrSheet
          open={isUpdateOpen}
          onOpenChange={setIsUpdateOpen}
          hr={selectedHR}
        />
      )}
    </main>
  );
}
