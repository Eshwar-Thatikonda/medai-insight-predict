
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProfilesPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Patient Profiles</h2>
        <p className="text-muted-foreground">Detailed patient profiles and medical histories.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Patient Profiles</CardTitle>
            <CardDescription>This feature is under development.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Patient profiles will be available in a future update.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilesPage;
