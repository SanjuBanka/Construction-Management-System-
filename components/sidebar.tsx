'use client';

import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Box,
  CheckSquare,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type UserRole = 'admin' | 'employee' | 'staff';

interface SidebarProps {
  userRole: UserRole;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  userRole,
  activeMenu,
  setActiveMenu,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (userRole === 'admin') {
      return [
        ...baseItems,
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'inventory', label: 'Inventory', icon: Box },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }

    if (userRole === 'employee') {
      return [
        ...baseItems,
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
        { id: 'inventory', label: 'Inventory', icon: Box },
        { id: 'profile', label: 'Profile', icon: Users },
      ];
    }

    if (userRole === 'staff') {
      return [
        ...baseItems,
        { id: 'projects', label: 'View Projects', icon: Briefcase },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-sidebar border-r border-sidebar-border fixed md:relative z-40 h-screen w-64 transition-transform duration-300 flex flex-col',
          !sidebarOpen && '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-primary">CE</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">CONSTRUCT</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeMenu === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3',
                activeMenu === item.id
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              onClick={() => {
                setActiveMenu(item.id);
                setSidebarOpen(false);
              }}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <p className="text-xs text-sidebar-foreground/60">Role-Based Access Control</p>
          <p className="text-sm font-medium text-sidebar-foreground">
            {userRole === 'admin' && 'Full System Access'}
            {userRole === 'employee' && 'Project & Task Access'}
            {userRole === 'staff' && 'View & Feedback Only'}
          </p>
        </div>
      </aside>
    </>
  );
}
