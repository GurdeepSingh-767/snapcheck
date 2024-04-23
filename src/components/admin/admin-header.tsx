"use client";

import * as React from "react";
import { useEffect } from 'react';
import Link from "next/link";
import {
  PanelLeft,
  LayoutDashboard,
  UserPlus,
  ListPlus,
  Settings,
  FolderKanban,
} from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function AdminHeader() {  
  // const router = useRouter();
  // const [data, setData] = React.useState("nothing");

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("/api/users/sign-out", {
  //       method: "GET",
  //     });
  //     if (response.ok) {
  //       console.log("Logged out successfully");
  //       router.push("/login");
  //     } else {
  //       console.error("Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // };

  // useEffect(() => {
  //   const getDetails = async () => {
  //     try {
  //       const res = await fetch("/api/users/hr", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (res.ok) {
  //         const data = await res.json();
  //         console.log("HR details:", data.data);
  //       } else {
  //         console.error("Failed to fetch HR details:", res.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching HR details:", error);
  //     }
  //   };
  //   getDetails();
  // }, []);

  // Define array of links
  const links = [
    { href: "/admin/dashboard", text: "Dashboard", icon: < LayoutDashboard className="h-5 w-5" /> },
    { href: "/admin/internal", text: "Internal HR", icon: <UserPlus className="h-5 w-5" /> },
    { href: "/admin/external", text: "External HR", icon: <ListPlus className="h-5 w-5" /> },
    { href: "/admin/plans", text: "Plan Request", icon: <FolderKanban className="h-5 w-5" /> },
    { href: "/admin/settings", text: "Settings", icon: <Settings className="h-5 w-5" /> },
    
  ];

  return (
    <header className="sticky top-0 z-30 px-2  flex h-14 items-center gap-4 border-b bg-muted/40  px-30 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className=" md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="font-semibold text-3xl">
              Snapcheck
            </Link>
            {/* Map over links array */}
            {links.map((link, index) => (
              <Link key={index} href={link.href} className="flex items-center gap-4 px-2.5 text-foreground">
                {link.icon}
                {link.text}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex justify-end ml-auto flex-1 md:grow-0">
        <ThemeToggle />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden p-2 rounded-full">
            AB
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem >Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
