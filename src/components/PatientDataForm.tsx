
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientData } from '@/types/medical';

interface PatientDataFormProps {
  onSubmit: (data: PatientData) => void;
  loading?: boolean;
}

export const PatientDataForm: React.FC<PatientDataFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<PatientData>({
    age: 45,
    gender: 'male',
    height: 170,
    weight: 70,
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
    },
    bloodSugar: 100,
    cholesterol: 180,
    smoking: false,
    diabetic: false,
    symptoms: [],
    familyHistory: [],
  });

  const commonSymptoms = [
    'fatigue', 'headache', 'dizziness', 'nausea', 'chest pain', 
    'shortness of breath', 'blurred vision', 'frequent urination', 
    'increased thirst', 'unexplained weight loss', 'joint pain'
  ];

  const diseaseOptions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'coronary', label: 'Coronary Artery Disease' },
    { value: 'stroke', label: 'Stroke' },
    { value: 'kidney', label: 'Kidney Disease' }
  ];

  const handleChange = (field: keyof PatientData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBloodPressureChange = (type: 'systolic' | 'diastolic', value: number) => {
    setFormData(prev => ({
      ...prev,
      bloodPressure: {
        ...(prev.bloodPressure || { systolic: 120, diastolic: 80 }),
        [type]: value
      }
    }));
  };

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms?.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...(prev.symptoms || []), symptom]
    }));
  };

  const handleFamilyHistoryToggle = (disease: string) => {
    setFormData(prev => ({
      ...prev,
      familyHistory: prev.familyHistory?.includes(disease)
        ? prev.familyHistory.filter(d => d !== disease)
        : [...(prev.familyHistory || []), disease]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-medical-700">Patient Data</CardTitle>
          <CardDescription>Enter patient information to get a diagnosis prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vitals" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
              <TabsTrigger value="medical-history">Medical History</TabsTrigger>
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vitals">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    value={formData.age} 
                    onChange={(e) => handleChange('age', parseInt(e.target.value))}
                    min={1}
                    max={120}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange('gender', value as 'male' | 'female' | 'other')}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    value={formData.height} 
                    onChange={(e) => handleChange('height', parseInt(e.target.value))}
                    min={50}
                    max={250}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    value={formData.weight} 
                    onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                    min={1}
                    max={300}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="systolic">Blood Pressure (Systolic)</Label>
                  <Input 
                    id="systolic" 
                    type="number" 
                    value={formData.bloodPressure?.systolic || 120} 
                    onChange={(e) => handleBloodPressureChange('systolic', parseInt(e.target.value))}
                    min={60}
                    max={300}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="diastolic">Blood Pressure (Diastolic)</Label>
                  <Input 
                    id="diastolic" 
                    type="number" 
                    value={formData.bloodPressure?.diastolic || 80} 
                    onChange={(e) => handleBloodPressureChange('diastolic', parseInt(e.target.value))}
                    min={40}
                    max={200}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                  <Input 
                    id="bloodSugar" 
                    type="number" 
                    value={formData.bloodSugar || 100} 
                    onChange={(e) => handleChange('bloodSugar', parseInt(e.target.value))}
                    min={40}
                    max={500}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                  <Input 
                    id="cholesterol" 
                    type="number" 
                    value={formData.cholesterol || 180} 
                    onChange={(e) => handleChange('cholesterol', parseInt(e.target.value))}
                    min={50}
                    max={400}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medical-history">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smoking"
                    checked={formData.smoking}
                    onCheckedChange={(checked) => handleChange('smoking', !!checked)}
                  />
                  <Label htmlFor="smoking">Smoking</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diabetic"
                    checked={formData.diabetic}
                    onCheckedChange={(checked) => handleChange('diabetic', !!checked)}
                  />
                  <Label htmlFor="diabetic">Diabetes</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Family History</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {diseaseOptions.map((disease) => (
                      <div key={disease.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`family-${disease.value}`}
                          checked={formData.familyHistory?.includes(disease.value)}
                          onCheckedChange={() => handleFamilyHistoryToggle(disease.value)}
                        />
                        <Label htmlFor={`family-${disease.value}`}>{disease.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="symptoms">
              <div className="space-y-2">
                <Label>Current Symptoms</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {commonSymptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={`symptom-${symptom}`}
                        checked={formData.symptoms?.includes(symptom)}
                        onCheckedChange={() => handleSymptomToggle(symptom)}
                      />
                      <Label htmlFor={`symptom-${symptom}`} className="capitalize">{symptom}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full md:w-auto medical-gradient">
            {loading ? "Processing..." : "Generate Prediction"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
