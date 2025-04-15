
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { PatientDataForm } from '@/components/PatientDataForm';
import PredictionResults from '@/components/PredictionResults';
import DashboardMetrics from '@/components/DashboardMetrics';
import { PatientData, PredictionResult } from '@/types/medical';
import { predictDisease } from '@/services/modelService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFormSubmit = async (data: PatientData) => {
    setLoading(true);
    
    try {
      // Simulate API call or processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get prediction from our model service
      const predictionResults = predictDisease(data);
      setResults(predictionResults);
      setHasSubmitted(true);
      
      toast({
        title: "Prediction Generated",
        description: `Analyzed data for a ${data.age} year-old patient with ${data.symptoms?.length || 0} symptoms`,
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Error",
        description: "There was an error generating the prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Medical Diagnosis Prediction</h2>
          <p className="text-muted-foreground">
            Use AI-powered predictions to assist in medical diagnosis based on patient data
          </p>
        </div>
        
        <DashboardMetrics />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <PatientDataForm onSubmit={handleFormSubmit} loading={loading} />
          </div>
          <div className={`${hasSubmitted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            {results.length > 0 && <PredictionResults results={results} />}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center border-t pt-6 mt-8">
          <p>Disclaimer: This is a demonstration tool only. Predictions should not be used for actual medical diagnosis without professional medical consultation.</p>
          <p className="mt-1">Always consult with qualified healthcare professionals for medical advice and treatment.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
