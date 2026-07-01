'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Dashboard from '@/components/dashboard';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type UserRole = 'admin' | 'employee' | 'staff' | null;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Demo credentials
    const credentials: Record<string, { password: string; role: UserRole }> = {
      'admin@construct.com': { password: 'admin123', role: 'admin' },
      'employee@construct.com': { password: 'emp123', role: 'employee' },
      'staff@construct.com': { password: 'staff123', role: 'staff' },
    };

    if (credentials[email] && credentials[email].password === password) {
      setIsLoggedIn(true);
      setUserRole(credentials[email].role);
    } else {
      setErrorMessage('Invalid email or password. Try the demo accounts above.');
    }
  };

  if (isLoggedIn && userRole) {
    return (
      <Dashboard
        userRole={userRole}
        onLogout={() => {
          setIsLoggedIn(false);
          setUserRole(null);
          setEmail('');
          setPassword('');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-100 dark:from-slate-950 dark:to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">CONSTRUCT Edge</h1>
          <p className="text-muted-foreground">Construction Management System</p>
        </div>

        <Card className="border-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border/50"
                  required
                />
              </div>

              {errorMessage && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
              <p className="font-semibold text-sm mb-3 text-foreground">Demo Accounts:</p>
              <div className="space-y-2 text-xs">
                <div>
                  <p className="font-medium text-primary">Admin Account:</p>
                  <p className="text-muted-foreground">admin@construct.com / admin123</p>
                </div>
                <div>
                  <p className="font-medium text-primary">Employee Account:</p>
                  <p className="text-muted-foreground">employee@construct.com / emp123</p>
                </div>
                <div>
                  <p className="font-medium text-primary">Staff Account:</p>
                  <p className="text-muted-foreground">staff@construct.com / staff123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 CONSTRUCT Edge. All rights reserved.
        </p>
      </div>
    </div>
  );
}
