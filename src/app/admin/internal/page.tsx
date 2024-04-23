"use client";

import * as React from "react";

import { Separator } from "@/components/ui/separator";
import AdminHeader from "@/components/admin/admin-header";
import InternalTable from "./internal-table";

export default function Internal() {
  return (
    <>
    <div className="flex flex-col sm:gap-4 sm:py-4 ">
      <AdminHeader />
      <Separator />
    </div>
     <InternalTable/>
     </>
  );
}
