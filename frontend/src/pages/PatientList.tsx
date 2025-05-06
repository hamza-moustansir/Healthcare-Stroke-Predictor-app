import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PatientListComponent from '../components/patients/PatientListComponent';
import { fetchPatients } from '../utils/api';

const PatientList = () => {
  const { t } = useLanguage();
  const [patients, setPatients] = useState<Patient[]>([]);
  
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        // Ajouter des valeurs par défaut pour les patients sans `prediction`
        const patientsWithDefaults = data.map(patient => ({
          ...patient,
          prediction: patient.prediction || { stroke: false, recommendations: [] },
        }));
        setPatients(patientsWithDefaults);
      } catch (error) {
        console.error("Erreur de chargement des patients:", error);
      }
    };
    loadPatients();
  }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('patient.list.title')}</h1>
        <p className="text-muted-foreground mt-1">
          View and manage patient records
        </p>
      </div>
      
      <PatientListComponent patients={patients} />
    </div>
  );
};

export default PatientList;