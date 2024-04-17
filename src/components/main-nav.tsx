"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Navlink } from "./landing/nav-link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <main className="px-2 sm:px-5 lg:px-20 bg-hero">
        <div className="flex h-16 md:h-20 justify-between items-center ">
          <div className="flex  ">
            <Link
              href="/"
              className="font-semibold text-white text-2xl lg:text-3xl"
            >
              Snapcheck
            </Link>
          </div>
          {/* Menu icon */}
          <button className="lg:hidden" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <Navlink />

          <div className="flex items-center space-x-4 hidden lg:block">
            {/* <Separator className='text-white bg-white' orientation='horizontal'/> */}
            <ThemeToggle />
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </main>
      {/* Side Drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-y-0 right-0 w-72 bg-gray-900 bg-opacity-80 z-50">
          <div className="flex flex-col items-start p-4">
            <button onClick={toggleDrawer} className="self-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-start space-y-2">
              <div className=" text-white text-md font-medium transition-colors  hover:text-primary cursor-pointer">
                <Link href="/home">Home</Link>
              </div>
              <div className="text-white text-md font-semibold transition-colors  hover:text-primary cursor-pointer">
                <Link href="#about">About Us</Link>
              </div>
              <div className=" text-white text-md font-medium transition-colors  hover:text-primary cursor-pointer">
                <Link href="/services">Services</Link>
              </div>
              <div className=" text-white text-md font-medium transition-colors  hover:text-primary cursor-pointer">
                <Link href="/blogs">Blogs</Link>
              </div>
              <div className=" text-white text-md font-medium transition-colors  hover:text-primary cursor-pointer">
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>
            <div className="flex gap-4 mt-5">
              <ThemeToggle />
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
