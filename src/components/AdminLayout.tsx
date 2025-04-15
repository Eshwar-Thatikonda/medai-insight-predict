
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Brain, Database, FileBarChart, Heart, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center px-6 bg-primary/10 dark:bg-gray-950 sticky top-0 z-10">
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
                <Heart className="h-5 w-5 text-primary" />
                <h1 className="font-semibold text-lg hidden sm:inline-block">MedAI Admin Panel</h1>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigate('/');
                  toast({
                    title: "Switched to User View",
                    description: "You are now viewing the user interface",
                  });
                }}
              >
                Switch to User View
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

const AdminSidebar = () => {
  return (
    <Sidebar className="border-r bg-primary/5">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/dashboard">
                    <FileBarChart className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/model-training">
                    <Brain className="h-4 w-4" />
                    <span>Model Training</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/patients">
                    <Users className="h-4 w-4" />
                    <span>Patient Data</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/settings">
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
