
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';

interface PredictionResultsProps {
  results: {
    disease: string;
    probability: number;
    description?: string;
    severity?: 'low' | 'medium' | 'high';
  }[];
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ results }) => {
  // Get the highest probability disease for the summary
  const topDisease = results.length > 0 ? results[0] : null;
  
  const getSeverityColor = (severity?: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-amber-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Prediction Results</span>
          {topDisease && (
            <span className={`text-sm font-medium px-2 py-1 rounded-full bg-primary/10 ${getSeverityColor(topDisease.severity)}`}>
              {topDisease.probability.toFixed(1)}% probability
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {topDisease && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{topDisease.disease}</h3>
              <AlertCircle className={`h-5 w-5 ${getSeverityColor(topDisease.severity)}`} />
            </div>
            {topDisease.description && (
              <p className="text-sm text-muted-foreground">{topDisease.description}</p>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Other Possibilities</h4>
          {results.slice(1).map((result, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{result.disease}</span>
                <span className="font-medium">{result.probability.toFixed(1)}%</span>
              </div>
              <Progress value={result.probability} className="h-2" />
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Disclaimer: These predictions are for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
