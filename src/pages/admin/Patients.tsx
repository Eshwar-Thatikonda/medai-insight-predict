
import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Filter, Plus, Search, Trash } from 'lucide-react';

const AdminPatients = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Patient Database</h2>
        <p className="text-muted-foreground">Manage patient records and data for model training</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>View, add, and manage patient data for training and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search patients..."
                    className="pl-8"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Key Indicators</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">P-1001</TableCell>
                      <TableCell>John Smith</TableCell>
                      <TableCell>54</TableCell>
                      <TableCell>Male</TableCell>
                      <TableCell>BP: 140/90, BS: 110mg/dL</TableCell>
                      <TableCell>2025-04-10</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">P-1002</TableCell>
                      <TableCell>Sarah Johnson</TableCell>
                      <TableCell>42</TableCell>
                      <TableCell>Female</TableCell>
                      <TableCell>BP: 120/80, BS: 95mg/dL</TableCell>
                      <TableCell>2025-04-08</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">P-1003</TableCell>
                      <TableCell>Michael Lee</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>Male</TableCell>
                      <TableCell>BP: 150/95, BS: 140mg/dL</TableCell>
                      <TableCell>2025-04-05</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">P-1004</TableCell>
                      <TableCell>Emma Wilson</TableCell>
                      <TableCell>35</TableCell>
                      <TableCell>Female</TableCell>
                      <TableCell>BP: 110/70, BS: 85mg/dL</TableCell>
                      <TableCell>2025-04-03</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">P-1005</TableCell>
                      <TableCell>David Miller</TableCell>
                      <TableCell>59</TableCell>
                      <TableCell>Male</TableCell>
                      <TableCell>BP: 135/85, BS: 105mg/dL</TableCell>
                      <TableCell>2025-04-01</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Quality</CardTitle>
            <CardDescription>Monitor and maintain the quality of patient data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col p-4 border rounded-lg">
                  <span className="text-sm text-muted-foreground">Missing Values</span>
                  <span className="text-2xl font-bold">2.3%</span>
                  <span className="text-xs text-green-600">Within acceptable range</span>
                </div>
                <div className="flex flex-col p-4 border rounded-lg">
                  <span className="text-sm text-muted-foreground">Data Consistency</span>
                  <span className="text-2xl font-bold">98.7%</span>
                  <span className="text-xs text-green-600">High quality</span>
                </div>
                <div className="flex flex-col p-4 border rounded-lg">
                  <span className="text-sm text-muted-foreground">Outliers</span>
                  <span className="text-2xl font-bold">1.5%</span>
                  <span className="text-xs text-amber-600">Requires review</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Run Data Quality Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPatients;
