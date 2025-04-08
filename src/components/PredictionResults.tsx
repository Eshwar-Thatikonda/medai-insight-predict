
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PredictionResult } from '@/types/medical';
import { Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionResultsProps {
  results: PredictionResult[];
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({ results }) => {
  if (!results.length) return null;
  
  const topResult = results[0];
  const riskLevel = getRiskLevel(topResult.probability);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-medical-700">Diagnosis Prediction</CardTitle>
          <CardDescription>AI-powered analysis of patient data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Alert variant={getRiskVariant(riskLevel)} className="border-l-4">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Primary Finding: {topResult.disease.name}</AlertTitle>
              <AlertDescription>
                Prediction confidence: {(topResult.probability * 100).toFixed(1)}% - {riskLevel} Risk
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={result.disease.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{result.disease.name}</div>
                    <div className={cn(
                      "text-sm font-bold",
                      result.probability > 0.7 ? "text-destructive" : 
                      result.probability > 0.4 ? "text-amber-500" : 
                      "text-green-500"
                    )}>
                      {(result.probability * 100).toFixed(1)}%
                    </div>
                  </div>
                  <Progress
                    value={result.probability * 100}
                    className={cn(
                      result.probability > 0.7 ? "bg-red-100" : 
                      result.probability > 0.4 ? "bg-amber-100" : 
                      "bg-green-100"
                    )}
                    indicatorClassName={
                      result.probability > 0.7 ? "bg-destructive" : 
                      result.probability > 0.4 ? "bg-amber-500" : 
                      "bg-green-500"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <DiseaseDetailCard disease={topResult.disease} />
    </div>
  );
};

interface DiseaseDetailCardProps {
  disease: PredictionResult['disease'];
}

const DiseaseDetailCard: React.FC<DiseaseDetailCardProps> = ({ disease }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-medical-700">{disease.name}</CardTitle>
        <CardDescription>{disease.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="symptoms">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
          </TabsList>
          <TabsContent value="symptoms" className="space-y-4 pt-4">
            <ul className="list-disc pl-6 space-y-2">
              {disease.symptoms.map((symptom, index) => (
                <li key={index} className="capitalize">{symptom}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="risk-factors" className="space-y-4 pt-4">
            <ul className="list-disc pl-6 space-y-2">
              {disease.riskFactors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="treatment" className="space-y-4 pt-4">
            <ul className="list-disc pl-6 space-y-2">
              {disease.treatmentOptions.map((treatment, index) => (
                <li key={index}>{treatment}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Helper functions
function getRiskLevel(probability: number): 'High' | 'Medium' | 'Low' {
  if (probability > 0.7) return 'High';
  if (probability > 0.4) return 'Medium';
  return 'Low';
}

function getRiskVariant(risk: 'High' | 'Medium' | 'Low'): 'destructive' | 'default' | null {
  switch (risk) {
    case 'High':
      return 'destructive';
    case 'Medium':
      return null;
    case 'Low':
      return 'default';
    default:
      return null;
  }
}
