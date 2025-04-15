
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientsPage from "./pages/Patients";
import AnalyticsPage from "./pages/Analytics";
import DatabasePage from "./pages/Database";
import ProfilesPage from "./pages/Profiles";
import SettingsPage from "./pages/Settings";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminModelTraining from "./pages/admin/ModelTraining";
import AdminPatients from "./pages/admin/Patients";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Index />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/model-training" element={<AdminModelTraining />} />
          <Route path="/admin/patients" element={<AdminPatients />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
