
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DatabasePage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Disease Database</h2>
        <p className="text-muted-foreground">Comprehensive information on various medical conditions.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Medical Knowledge Base</CardTitle>
            <CardDescription>This feature is under development.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Disease database will be available in a future update.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DatabasePage;
