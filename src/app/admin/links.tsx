import React from 'react';
import { ListPlus, UserPlus, Settings, LayoutDashboard } from 'lucide-react';

export const sidebarNavItems = [
  {
    title: "Track Order",
    href: "/admin/trackorder",
    icon: <ListPlus size={20} />,
  },
  {
    title: "Create Order",
    href: "/admin/createorder",
    icon: <UserPlus size={20} />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings size={20} />,
  },
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
];
