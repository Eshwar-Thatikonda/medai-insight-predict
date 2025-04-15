
import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Brain, Upload, Database, BookOpen, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const ModelTraining = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [modelParameters, setModelParameters] = useState({
    learningRate: '0.001',
    epochs: '50',
    batchSize: '32',
    validationSplit: '0.2',
  });
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: 'File Selected',
        description: `Selected file: ${e.target.files[0].name}`,
      });
    }
  };

  const handleParameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModelParameters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    toast({
      title: 'Training Started',
      description: 'Model training has begun. This may take some time.',
    });
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast({
            title: 'Training Complete',
            description: 'Model training has finished successfully.',
          });
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Model Training</h2>
        <p className="text-muted-foreground">
          Upload datasets and train new machine learning models for disease prediction
        </p>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Data Upload</TabsTrigger>
            <TabsTrigger value="training">Training Parameters</TabsTrigger>
            <TabsTrigger value="history">Training History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Dataset</CardTitle>
                <CardDescription>
                  Upload CSV files containing patient data for model training
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full gap-2">
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="mb-2 text-sm text-center text-muted-foreground">
                      Drag and drop your CSV file here, or click to browse
                    </p>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      accept=".csv" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                    <Button asChild>
                      <label htmlFor="file-upload">Select File</label>
                    </Button>
                    {selectedFile && (
                      <div className="mt-4 text-sm">
                        Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Dataset Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>CSV file with headers in the first row</li>
                    <li>Patient data columns should include age, gender, symptoms, etc.</li>
                    <li>Target diagnosis column should be labeled "diagnosis"</li>
                    <li>No missing or null values</li>
                    <li>Maximum file size: 100MB</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  disabled={!selectedFile}
                  onClick={() => {
                    toast({
                      title: "Dataset Validated",
                      description: "Your dataset has been validated and is ready for training.",
                    });
                  }}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Validate Dataset
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="training" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Training Parameters</CardTitle>
                <CardDescription>
                  Configure the parameters for model training
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="learningRate">Learning Rate</Label>
                    <Input 
                      id="learningRate" 
                      name="learningRate"
                      type="number" 
                      step="0.0001"
                      value={modelParameters.learningRate}
                      onChange={handleParameterChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Step size for gradient descent (0.0001-0.1)
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="epochs">Epochs</Label>
                    <Input 
                      id="epochs" 
                      name="epochs"
                      type="number" 
                      value={modelParameters.epochs}
                      onChange={handleParameterChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Number of complete passes through the dataset
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Input 
                      id="batchSize" 
                      name="batchSize"
                      type="number" 
                      value={modelParameters.batchSize}
                      onChange={handleParameterChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Number of samples per gradient update
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="validationSplit">Validation Split</Label>
                    <Input 
                      id="validationSplit" 
                      name="validationSplit"
                      type="number" 
                      step="0.1"
                      min="0.1"
                      max="0.5"
                      value={modelParameters.validationSplit}
                      onChange={handleParameterChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Fraction of training data to use for validation (0.1-0.5)
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Model Architecture</h3>
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Random Forest Classifier</span>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {isTraining && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Training Progress</h3>
                        <span className="text-sm text-muted-foreground">{Math.round(trainingProgress)}%</span>
                      </div>
                      <Progress value={trainingProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className="w-full"
                  onClick={handleStartTraining}
                  disabled={isTraining || !selectedFile}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {isTraining ? "Training in Progress..." : "Start Training"}
                </Button>
                
                {isTraining && (
                  <p className="text-xs text-muted-foreground text-center">
                    This is a simulation. In a real environment, model training may take hours or days depending on dataset size and complexity.
                  </p>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Training History</CardTitle>
                <CardDescription>
                  Previous model training sessions and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Date</div>
                    <div>Model Type</div>
                    <div>Dataset</div>
                    <div>Accuracy</div>
                    <div>Actions</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>2025-04-13</div>
                    <div>Random Forest</div>
                    <div>patients_2025.csv</div>
                    <div className="text-green-600">94.2%</div>
                    <div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>2025-04-01</div>
                    <div>XGBoost</div>
                    <div>clinic_data.csv</div>
                    <div className="text-green-600">92.7%</div>
                    <div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>2025-03-15</div>
                    <div>Neural Network</div>
                    <div>hospital_records.csv</div>
                    <div className="text-amber-600">89.3%</div>
                    <div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ModelTraining;
