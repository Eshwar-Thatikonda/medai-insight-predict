
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Advanced analytics and insights on patient data and predictions.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>This feature is under development.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Detailed analytics will be available in a future update.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
