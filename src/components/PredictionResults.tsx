import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowUpRight, Database, Users, Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">Monitor system performance and model metrics</p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +42 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predictions Made</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,678</div>
              <p className="text-xs text-muted-foreground">
                +320 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">
                +1.2% from last version
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Size</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4 GB</div>
              <p className="text-xs text-muted-foreground">
                +1.8 GB from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Prediction Trends</CardTitle>
              <CardDescription>Daily prediction volume over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer 
                config={{
                  primary: {
                    color: 'hsl(var(--primary))'
                  }
                }}
              >
                {/* Simple prediction trends visualization */}
                <div className="w-full h-full flex items-end">
                  {[320, 280, 420, 380, 450, 520].map((value, i) => (
                    <div 
                      key={i} 
                      className="h-full flex-1 flex flex-col justify-end mx-1"
                    >
                      <div 
                        style={{ height: `${(value / 520) * 100}%` }} 
                        className="bg-primary/80 rounded-t-sm"
                      ></div>
                      <div className="text-xs mt-1 text-center">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</div>
                    </div>
                  ))}
                </div>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Disease Distribution</CardTitle>
              <CardDescription>Most common predicted diseases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Diabetes', value: 210, max: 210 },
                { name: 'Hypertension', value: 180, max: 210 },
                { name: 'CAD', value: 120, max: 210 },
                { name: 'Arthritis', value: 90, max: 210 },
                { name: 'COPD', value: 70, max: 210 }
              ].map((disease) => (
                <div key={disease.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{disease.name}</span>
                    <span className="font-medium">{disease.value}</span>
                  </div>
                  <Progress value={(disease.value / disease.max) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Recent system alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Model training completed</p>
                  <p className="text-sm text-muted-foreground">
                    New model version 2.4.1 is ready for deployment.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <AlertCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Database backup successful</p>
                  <p className="text-sm text-muted-foreground">
                    Weekly backup completed and stored in secure location.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">New patient data imported</p>
                  <p className="text-sm text-muted-foreground">
                    145 new patient records have been added to the database.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
