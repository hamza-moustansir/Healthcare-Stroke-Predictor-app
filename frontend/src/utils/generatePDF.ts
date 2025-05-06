
import { Patient } from '../data/mockData';

export const generatePDF = (patient: Patient) => {
  // In a real application, you would use a library like jspdf or pdfmake
  // For this demo, we'll just mock the functionality
  
  console.log('Generating PDF for patient:', patient);
  
  // Create a simple text version of the patient data
  const patientData = `
    Patient Information
    ------------------
    Name: ${patient.firstName} ${patient.lastName}
    Age: ${patient.age}
    Hypertension: ${patient.hypertension ? 'Yes' : 'No'}
    Heart Disease: ${patient.heartDisease ? 'Yes' : 'No'}
    Ever Married: ${patient.everMarried ? 'Yes' : 'No'}
    Work Type: ${patient.workType}
    Glucose Level: ${patient.glucoseLevel} mg/dL
    BMI: ${patient.bmi}
    Stroke Risk: ${patient.strokeRisk ? 'High' : 'Low'}
    Assessment Date: ${new Date(patient.assessmentDate).toLocaleDateString()}
  `;
  
  // Create a blob with the text data
  const blob = new Blob([patientData], { type: 'text/plain' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `patient_${patient.lastName}_${patient.firstName}.txt`;
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
