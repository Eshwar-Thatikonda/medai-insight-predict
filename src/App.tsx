
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientsPage from "./pages/Patients";
import AnalyticsPage from "./pages/Analytics";
import DatabasePage from "./pages/Database";
import ProfilesPage from "./pages/Profiles";
import SettingsPage from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminModelTraining from "./pages/admin/ModelTraining";
import AdminPatients from "./pages/admin/Patients";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected user routes */}
            <Route path="/" element={
              <ProtectedRoute requiredRole="candidate">
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/patients" element={
              <ProtectedRoute requiredRole="candidate">
                <PatientsPage />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute requiredRole="candidate">
                <AnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/database" element={
              <ProtectedRoute requiredRole="candidate">
                <DatabasePage />
              </ProtectedRoute>
            } />
            <Route path="/profiles" element={
              <ProtectedRoute requiredRole="candidate">
                <ProfilesPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute requiredRole="candidate">
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Protected admin routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/model-training" element={
              <ProtectedRoute requiredRole="admin">
                <AdminModelTraining />
              </ProtectedRoute>
            } />
            <Route path="/admin/patients" element={
              <ProtectedRoute requiredRole="admin">
                <AdminPatients />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <AdminSettings />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
