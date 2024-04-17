import React from 'react';
import { MessageCircle , ListPlus, UserPlus, Settings, LayoutDashboard } from 'lucide-react';

export const sidebarNavItems = [
  {
    title: "Inbox",
    href: "/candidate/inbox",
    icon: <MessageCircle size={20} />,
  },
  {
    title: "Settings",
    href: "/candidate/settings",
    icon: <Settings size={20} />,
  },
  {
    title: "Dashboard",
    href: "/candidate/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
];
