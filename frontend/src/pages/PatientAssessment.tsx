import { useLanguage } from '../context/LanguageContext';
import PatientForm from '../components/patients/PatientForm';
import { toast } from "sonner";

const PatientAssessment = () => {
  const { t } = useLanguage();
  
  const handlePatientAdded = (patient: any) => {
    console.log('New patient assessment:', patient);
    toast.success('Patient assessment saved successfully');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('patient.form.title')}</h1>
        <p className="text-muted-foreground mt-1">
          Fill out the form below to assess stroke risk
        </p>
      </div>
      
      <div className="glass-panel rounded-lg p-6">
        <PatientForm onPatientAdded={handlePatientAdded} />
      </div>
    </div>
  );
};

export default PatientAssessment;