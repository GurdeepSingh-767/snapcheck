"use client"

import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";



export default function AuthenticationPage() {
  return (
    <>
      
      <div className="container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
       
        <div className="relative hidden h-screen flex-col  dark:border-r lg:flex">
        <Image
          src='/images/login.png'
          width={100}
          height={100}
       
          alt='login.png'
          className='block dark:hidden h-screen object-fill h-screen w-full'
        />
        <Image
          src='/images/login.png'
          width={100}
          height={100}
          alt='login.png'
          className='hidden dark:block object-fill h-screen w-full '
        />
          
          
        </div>

        {/* Signup Form */}
        <div className="p-3 sm:p-8 ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 w-[300px] sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
            </div>
            <UserAuthForm />
            

            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have a account{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
               Login
              </Link>
             
              
            </p>
          </div>
        </div>
      </div>
    </>
  );
}