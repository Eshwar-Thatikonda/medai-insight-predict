
import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully",
    });
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Admin Settings</h2>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="model">Model Settings</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage basic system configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input id="system-name" defaultValue="MedAI Insight Predict" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="admin-email">Administrator Email</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@medai.example.com" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                    <Input id="data-retention" type="number" defaultValue="365" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alerts">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive email notifications for system events</p>
                    </div>
                    <Switch id="alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Schedule regular database backups</p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Temporarily disable user access for maintenance</p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="model" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
                <CardDescription>Configure AI model settings and defaults</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="default-model">Default Model</Label>
                    <select 
                      id="default-model" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="random-forest">Random Forest (v2.4.1)</option>
                      <option value="xgboost">XGBoost (v1.8.3)</option>
                      <option value="neural-network">Neural Network (v3.2.0)</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="confidence-threshold">Minimum Confidence Threshold (%)</Label>
                    <Input id="confidence-threshold" type="number" min="1" max="100" defaultValue="75" />
                    <p className="text-xs text-muted-foreground">
                      Only show predictions above this confidence level
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="auto-update">Automatic Model Updates</Label>
                    <select 
                      id="auto-update" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="disabled">Disabled</option>
                      <option value="notify">Notify Only</option>
                      <option value="auto">Automatic (Recommended)</option>
                    </select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Advanced Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="feature-importance">Show Feature Importance</Label>
                      <p className="text-sm text-muted-foreground">Display which factors influenced the prediction</p>
                    </div>
                    <Switch id="feature-importance" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="explainable-ai">Explainable AI</Label>
                      <p className="text-sm text-muted-foreground">Generate human-readable explanations for predictions</p>
                    </div>
                    <Switch id="explainable-ai" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="multi-disease">Multi-Disease Prediction</Label>
                      <p className="text-sm text-muted-foreground">Allow prediction of multiple conditions simultaneously</p>
                    </div>
                    <Switch id="multi-disease" />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    This section would typically contain user management controls. In a real application, you would be able to add, edit, and remove user accounts, as well as manage their permissions and access levels.
                  </p>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-center h-60">
                  <p className="text-center text-muted-foreground">
                    User management interface would be implemented here in a production environment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage API keys and endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    This section would typically contain API management controls. In a real application, you would be able to generate API keys, view usage statistics, and configure rate limits.
                  </p>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-center h-60">
                  <p className="text-center text-muted-foreground">
                    API management interface would be implemented here in a production environment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
