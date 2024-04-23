import React from 'react';
import { ListPlus, UserPlus, Settings, LayoutDashboard, FolderKanban } from 'lucide-react';

export const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Internal HR",
    href: "/admin/internal",
    icon: <UserPlus size={20} />,
  },
  {
    title: "External HR",
    href: "/admin/external",
    icon: <ListPlus size={20} />,
  },
  {
    title: "Plan Request",
    href: "/admin/plans",
    icon: <FolderKanban size={20} />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings size={20} />,
  },

];
