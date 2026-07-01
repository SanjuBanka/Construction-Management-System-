'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Menu, X } from 'lucide-react';
import Sidebar from '@/components/sidebar';
import AdminPanel from '@/components/panels/admin-panel';
import EmployeePanel from '@/components/panels/employee-panel';
import StaffPanel from '@/components/panels/staff-panel';

type UserRole = 'admin' | 'employee' | 'staff';

interface DashboardProps {
  userRole: UserRole;
  onLogout: () => void;
}

export default function Dashboard({ userRole, onLogout }: DashboardProps) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getRoleLabel = (role: UserRole) => {
    const labels: Record<UserRole, string> = {
      admin: 'Administrator',
      employee: 'Employee',
      staff: 'Staff Member',
    };
    return labels[role];
  };

  const renderContent = () => {
    switch (userRole) {
      case 'admin':
        return <AdminPanel activeMenu={activeMenu} />;
      case 'employee':
        return <EmployeePanel activeMenu={activeMenu} />;
      case 'staff':
        return <StaffPanel activeMenu={activeMenu} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
              <div>
                <h2 className="text-lg font-semibold">CONSTRUCT Edge</h2>
                <p className="text-xs text-muted-foreground">{getRoleLabel(userRole)}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="gap-2 border-border/50 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
