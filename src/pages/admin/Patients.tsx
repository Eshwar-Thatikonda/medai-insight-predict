
import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import AddCandidateForm from '@/components/AddCandidateForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPatients = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Patient Management</h2>
          <p className="text-muted-foreground">
            Manage patient data and add new candidates to the system
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Patient Statistics</CardTitle>
                <CardDescription>
                  Overview of patient data in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="text-sm font-medium">Total Patients</p>
                    <p className="text-3xl font-bold">247</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="text-sm font-medium">Active Candidates</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="text-sm font-medium">Diagnoses Performed</p>
                    <p className="text-3xl font-bold">1,458</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <AddCandidateForm />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPatients;
