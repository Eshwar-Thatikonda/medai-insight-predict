
// Types for the medical diagnostic system

export interface PatientData {
  id?: string;
  name?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  bloodSugar?: number; // mg/dL
  cholesterol?: number; // mg/dL
  smoking?: boolean;
  diabetic?: boolean;
  symptoms?: string[];
  familyHistory?: string[]; // Array of disease IDs
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  riskFactors: string[];
  treatmentOptions: string[];
  factorsWeights: {
    [key: string]: number; // Weight given to each factor in prediction
  };
}

export interface PredictionResult {
  disease: string;
  probability: number;
  description?: string;
  severity?: 'low' | 'medium' | 'high';
}
