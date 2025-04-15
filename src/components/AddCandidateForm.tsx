
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { addCandidate } from '@/contexts/AuthContext';

const AddCandidateForm = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCandidate = async () => {
    if (!currentUser || currentUser.role !== 'admin') {
      toast({
        title: "Error",
        description: "Only admins can add candidates",
        variant: "destructive",
      });
      return;
    }

    // Validation
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      await addCandidate(currentUser, { name, email, password });
      
      toast({
        title: "Success",
        description: "Candidate added successfully",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to add candidate';
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Candidate</CardTitle>
        <CardDescription>
          Create a new candidate account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="candidate-name">Full Name</Label>
          <Input 
            id="candidate-name" 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="candidate-email">Email</Label>
          <Input 
            id="candidate-email" 
            type="email" 
            placeholder="candidate@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="candidate-password">Password</Label>
          <Input 
            id="candidate-password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleAddCandidate}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Candidate'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddCandidateForm;
