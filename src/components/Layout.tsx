
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Activity, Database, FileBarChart, Heart, Info, LogOut, Settings, Thermometer, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center px-6 bg-white dark:bg-gray-950 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="lg:hidden">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M3 7h18"></path>
                    <path d="M4 12h16"></path>
                    <path d="M5 17h14"></path>
                  </svg>
                </Button>
              </SidebarTrigger>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-medical-600" />
                <h1 className="font-semibold text-lg hidden sm:inline-block">MedAI Insight Predict</h1>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {currentUser && (
                <span className="text-sm text-muted-foreground mr-4">
                  Welcome, {currentUser.name}
                </span>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "Help Center",
                    description: "Contact support for assistance with diagnosis predictions.",
                  });
                }}
              >
                <Info className="h-4 w-4 mr-2" />
                Help
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-secondary/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <Activity className="h-4 w-4" />
                    <span>Diagnosis Predictor</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/patients">
                    <Users className="h-4 w-4" />
                    <span>Patient Records</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/analytics">
                    <FileBarChart className="h-4 w-4" />
                    <span>Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/database">
                    <Database className="h-4 w-4" />
                    <span>Disease Database</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/profiles">
                    <User className="h-4 w-4" />
                    <span>Patient Profiles</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
