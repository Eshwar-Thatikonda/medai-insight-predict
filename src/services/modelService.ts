
// This file simulates ML model predictions that would normally come from a backend
import { PatientData, Disease, PredictionResult } from "@/types/medical";

// Simulated diseases with their symptoms and information
const diseases: Disease[] = [
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes',
    description: 'A chronic condition that affects how your body metabolizes sugar (glucose).',
    symptoms: ['frequent urination', 'increased thirst', 'unexplained weight loss', 'fatigue', 'blurred vision', 'slow-healing sores'],
    riskFactors: ['Being overweight', 'Fat distribution', 'Inactivity', 'Family history', 'Age', 'Prediabetes', 'Gestational diabetes'],
    treatmentOptions: ['Healthy eating', 'Regular exercise', 'Weight loss', 'Diabetes medication or insulin therapy', 'Blood sugar monitoring'],
    factorsWeights: {
      age: 0.2,
      bloodSugar: 0.5,
      bmi: 0.3,
      familyHistory: 0.4,
      cholesterol: 0.1,
      bloodPressure: 0.2
    }
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    description: 'High blood pressure is a common condition that can lead to serious health problems if untreated.',
    symptoms: ['headaches', 'shortness of breath', 'nosebleeds', 'facial flushing', 'dizziness', 'chest pain'],
    riskFactors: ['Age', 'Family history', 'Being overweight or obese', 'Not being physically active', 'Using tobacco', 'Too much salt', 'Drinking too much alcohol', 'Stress', 'Certain chronic conditions'],
    treatmentOptions: ['Healthy diet', 'Regular physical activity', 'Maintaining a healthy weight', 'Limiting alcohol', 'Quitting smoking', 'Managing stress', 'Medication'],
    factorsWeights: {
      age: 0.3,
      bloodPressure: 0.6,
      bmi: 0.3,
      familyHistory: 0.2,
      cholesterol: 0.3,
      smoking: 0.4
    }
  },
  {
    id: 'coronary',
    name: 'Coronary Artery Disease',
    description: 'A common heart condition that affects the major blood vessels that supply the heart with blood, oxygen, and nutrients.',
    symptoms: ['chest pain (angina)', 'shortness of breath', 'pain in the neck, jaw, throat, upper abdomen or back', 'nausea', 'fatigue'],
    riskFactors: ['Age', 'Sex', 'Family history', 'Smoking', 'High blood pressure', 'High cholesterol', 'Diabetes', 'Overweight or obesity', 'Physical inactivity', 'Stress', 'Unhealthy diet'],
    treatmentOptions: ['Lifestyle changes', 'Medications', 'Medical procedures or surgery'],
    factorsWeights: {
      age: 0.4,
      bloodPressure: 0.4,
      cholesterol: 0.5,
      smoking: 0.5,
      diabetes: 0.3,
      familyHistory: 0.3,
      bmi: 0.2
    }
  }
];

// Function to predict disease likelihood from patient data
export const predictDisease = (patientData: PatientData): { disease: string; probability: number; description?: string; severity?: 'low' | 'medium' | 'high' }[] => {
  // This is a simplified simulation of an ML model's prediction logic
  
  const results = diseases.map(disease => {
    let probability = 0;
    let totalWeight = 0;
    
    // Calculate weighted probability based on patient data and disease factors
    if (disease.factorsWeights.age) {
      probability += calculateAgeFactor(patientData.age, disease.id) * disease.factorsWeights.age;
      totalWeight += disease.factorsWeights.age;
    }
    
    if (disease.factorsWeights.bloodSugar && patientData.bloodSugar) {
      probability += calculateBloodSugarFactor(patientData.bloodSugar, disease.id) * disease.factorsWeights.bloodSugar;
      totalWeight += disease.factorsWeights.bloodSugar;
    }
    
    if (disease.factorsWeights.bloodPressure && patientData.bloodPressure) {
      probability += calculateBloodPressureFactor(patientData.bloodPressure, disease.id) * disease.factorsWeights.bloodPressure;
      totalWeight += disease.factorsWeights.bloodPressure;
    }
    
    if (disease.factorsWeights.cholesterol && patientData.cholesterol) {
      probability += calculateCholesterolFactor(patientData.cholesterol, disease.id) * disease.factorsWeights.cholesterol;
      totalWeight += disease.factorsWeights.cholesterol;
    }
    
    if (disease.factorsWeights.bmi && patientData.weight && patientData.height) {
      const bmi = calculateBMI(patientData.weight, patientData.height);
      probability += calculateBMIFactor(bmi, disease.id) * disease.factorsWeights.bmi;
      totalWeight += disease.factorsWeights.bmi;
    }
    
    if (disease.factorsWeights.smoking && patientData.smoking) {
      probability += patientData.smoking ? 0.8 : 0.1;
      totalWeight += disease.factorsWeights.smoking;
    }
    
    if (disease.factorsWeights.familyHistory && patientData.familyHistory) {
      probability += patientData.familyHistory.includes(disease.id) ? 0.7 : 0.1;
      totalWeight += disease.factorsWeights.familyHistory;
    }
    
    if (disease.factorsWeights.diabetes && patientData.diabetic) {
      probability += patientData.diabetic ? 0.8 : 0.1;
      totalWeight += disease.factorsWeights.diabetes;
    }
    
    // Normalize probability based on the weights used
    probability = totalWeight > 0 ? probability / totalWeight : 0;
    
    // Add small random component to simulate model variance (0.9 - 1.1 multiplier)
    const randomFactor = 0.9 + Math.random() * 0.2;
    probability *= randomFactor;
    
    // Clamp between 0 and 1
    probability = Math.max(0, Math.min(1, probability));
    
    // Determine severity based on probability
    let severity: 'low' | 'medium' | 'high' | undefined;
    if (probability < 0.33) {
      severity = 'low';
    } else if (probability < 0.66) {
      severity = 'medium';
    } else {
      severity = 'high';
    }
    
    // Convert probability to percentage for display
    const probabilityPercent = probability * 100;
    
    return {
      disease: disease.name,
      probability: probabilityPercent,
      description: disease.description,
      severity
    };
  });
  
  // Sort by highest probability first
  return results.sort((a, b) => b.probability - a.probability);
};

// Helper calculation functions
function calculateAgeFactor(age: number, diseaseId: string): number {
  switch(diseaseId) {
    case 'diabetes':
      return age < 30 ? 0.2 : age < 45 ? 0.4 : age < 60 ? 0.7 : 0.9;
    case 'hypertension':
      return age < 30 ? 0.1 : age < 45 ? 0.3 : age < 60 ? 0.6 : 0.9;
    case 'coronary':
      return age < 30 ? 0.1 : age < 45 ? 0.4 : age < 60 ? 0.7 : 0.9;
    default:
      return 0.5;
  }
}

function calculateBloodSugarFactor(bloodSugar: number, diseaseId: string): number {
  if (diseaseId === 'diabetes') {
    return bloodSugar < 100 ? 0.1 : bloodSugar < 126 ? 0.5 : bloodSugar < 180 ? 0.8 : 0.95;
  }
  return bloodSugar < 100 ? 0.3 : bloodSugar < 126 ? 0.5 : 0.7;
}

function calculateBloodPressureFactor(bloodPressure: { systolic: number, diastolic: number }, diseaseId: string): number {
  const { systolic, diastolic } = bloodPressure;
  
  if (diseaseId === 'hypertension') {
    if (systolic < 120 && diastolic < 80) return 0.1; // Normal
    if (systolic < 130 && diastolic < 80) return 0.3; // Elevated
    if (systolic < 140 || diastolic < 90) return 0.6; // Stage 1
    return 0.9; // Stage 2 or higher
  }
  
  if (diseaseId === 'coronary') {
    if (systolic < 120 && diastolic < 80) return 0.2; // Normal
    if (systolic < 130 && diastolic < 80) return 0.4; // Elevated
    if (systolic < 140 || diastolic < 90) return 0.6; // Stage 1
    return 0.8; // Stage 2 or higher
  }
  
  // Default for other diseases
  if (systolic < 120 && diastolic < 80) return 0.2;
  if (systolic < 140 && diastolic < 90) return 0.4;
  return 0.6;
}

function calculateCholesterolFactor(cholesterol: number, diseaseId: string): number {
  if (diseaseId === 'coronary') {
    return cholesterol < 200 ? 0.2 : cholesterol < 240 ? 0.5 : 0.9;
  }
  return cholesterol < 200 ? 0.3 : cholesterol < 240 ? 0.5 : 0.7;
}

function calculateBMI(weight: number, height: number): number {
  // BMI = weight(kg) / height(m)^2
  const heightInMeters = height / 100; // Converting cm to meters
  return weight / (heightInMeters * heightInMeters);
}

function calculateBMIFactor(bmi: number, diseaseId: string): number {
  if (bmi < 18.5) {
    return 0.3; // Underweight
  } else if (bmi < 25) {
    return 0.1; // Normal weight
  } else if (bmi < 30) {
    return 0.5; // Overweight
  } else if (bmi < 35) {
    return 0.7; // Obesity Class 1
  } else if (bmi < 40) {
    return 0.8; // Obesity Class 2
  } else {
    return 0.9; // Extreme Obesity
  }
}

export const getDiseases = (): Disease[] => {
  return diseases;
};

export const getDisease = (id: string): Disease | undefined => {
  return diseases.find(disease => disease.id === id);
};
