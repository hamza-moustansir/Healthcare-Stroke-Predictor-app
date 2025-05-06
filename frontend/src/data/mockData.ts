
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  hypertension: boolean;
  heartDisease: boolean;
  everMarried: boolean;
  workType: 'children' | 'govt' | 'neverWorked' | 'private' | 'selfEmployed';
  glucoseLevel: number;
  bmi: number;
  strokeRisk: boolean;
  assessmentDate: string;
}

export const generateMockPatients = (): Patient[] => {
  const workTypes: Patient['workType'][] = ['children', 'govt', 'neverWorked', 'private', 'selfEmployed'];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `p${i + 1}`,
    firstName: [`John`, `Jane`, `Mike`, `Emma`, `David`, `Sarah`, `Robert`, `Lisa`][Math.floor(Math.random() * 8)],
    lastName: [`Smith`, `Johnson`, `Williams`, `Brown`, `Jones`, `Miller`, `Davis`, `Wilson`][Math.floor(Math.random() * 8)],
    age: Math.floor(Math.random() * 50) + 20,
    hypertension: Math.random() > 0.5,
    heartDisease: Math.random() > 0.7,
    everMarried: Math.random() > 0.4,
    workType: workTypes[Math.floor(Math.random() * workTypes.length)],
    glucoseLevel: Math.floor(Math.random() * 200) + 70,
    bmi: parseFloat((Math.random() * 15 + 18).toFixed(1)),
    strokeRisk: Math.random() > 0.7,
    assessmentDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export const mockPatients = generateMockPatients();

export const getChartData = () => {
  const highRisk = mockPatients.filter(p => p.strokeRisk).length;
  const lowRisk = mockPatients.length - highRisk;
  
  return [
    { name: 'High Risk', value: highRisk },
    { name: 'Low Risk', value: lowRisk },
  ];
};

export const assessStrokeRisk = (patient: Omit<Patient, 'id' | 'strokeRisk' | 'assessmentDate'>): boolean => {
  // This is a simplified risk assessment logic - in a real app this would be based on medical algorithms
  let riskScore = 0;
  
  if (patient.age > 60) riskScore += 2;
  if (patient.hypertension) riskScore += 2;
  if (patient.heartDisease) riskScore += 2;
  if (patient.glucoseLevel > 140) riskScore += 1;
  if (patient.bmi > 30) riskScore += 1;
  
  return riskScore >= 4;
};
