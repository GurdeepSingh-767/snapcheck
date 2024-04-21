import React from 'react';
import { ListPlus, UserPlus, Settings, LayoutDashboard } from 'lucide-react';

export const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Add Internal HR",
    href: "/admin/internal",
    icon: <UserPlus size={20} />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings size={20} />,
  },

];
