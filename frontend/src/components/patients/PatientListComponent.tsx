import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { generatePDF } from '../../utils/generatePDF';
import { Patient } from '../../utils/api';
import jsPDF from "jspdf";

interface PatientListProps {
  patients: Patient[];
}

const PatientList = ({ patients }: PatientListProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Filtrer les patients en fonction du terme de recherche
  const filteredPatients = patients.filter(
    patient =>
      patient.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.prenom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer le clic sur un patient
  const handlePatientClick = (patient: Patient) => {
    console.log("Selected patient:", patient); // Log pour déboguer
    setSelectedPatient(patient);
  };

  const handleExportPDF = () => {
    if (!selectedPatient) return;
  
    // Créer un nouveau document PDF
    const doc = new jsPDF();
  
    // Titre du document
    doc.setFontSize(18);
    doc.text("Détails du patient", 10, 10);
  
    // Informations du patient
    doc.setFontSize(12);
    let yOffset = 20;
  
    const addLine = (label: string, value: string | number) => {
      doc.text(`${label}: ${value}`, 10, yOffset);
      yOffset += 10;
    };
  
    // Ajouter les informations du patient
    addLine("Nom", selectedPatient.nom);
    addLine("Prénom", selectedPatient.prenom);
    addLine("Âge", selectedPatient.age);
    addLine("Hypertension", selectedPatient.hypertension ? "Oui" : "Non");
    addLine("Cardiopathie", selectedPatient.heart_disease ? "Oui" : "Non");
    addLine("Glucose moyen", selectedPatient.avg_glucose_level);
    addLine("IMC", selectedPatient.bmi);
    addLine("Type de travail", getWorkTypeLabel(selectedPatient.work_type));
    addLine("Marié(e)", selectedPatient.ever_married ? "Oui" : "Non");
    addLine("Risque AVC", selectedPatient.stroke === 1 ? "Élevé" : "Faible");
  
    // Ajouter les recommandations
    yOffset += 10; // Espace avant les recommandations
    doc.setFontSize(14);
    doc.text("Recommandations:", 10, yOffset);
    yOffset += 10;
  
    doc.setFontSize(12);
    getRecommendations(selectedPatient.stroke).forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec}`, 15, yOffset);
      yOffset += 10;
    });
  
    // Enregistrer le PDF
    doc.save(`patient_${selectedPatient.nom}_${selectedPatient.prenom}.pdf`);
  };

  // Convertir work_type en texte lisible
  const getWorkTypeLabel = (workType: number) => {
    switch (workType) {
      case 0:
        return t('patient.form.workType.govt');
      case 1:
        return t('patient.form.workType.children');
      case 2:
        return t('patient.form.workType.private');
      case 3:
        return t('patient.form.workType.selfEmployed');
      default:
        return t('patient.form.workType.unknown');
    }
  };

  // Générer des recommandations en fonction du risque d'AVC
  const getRecommendations = (stroke: number) => {
    if (stroke === 1) {
      return [
        "Suivi médical régulier",
"Adopter un régime alimentaire sain",
"Activité physique adaptée",
"Surveillance du taux de glucose et du BMI",
      ];
    } else {
      return [
        "Maintenir un mode de vie sain",
"Contrôler régulièrement les paramètres vitaux",
      ];
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Barre de recherche */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('patient.list.search')}
          className="form-input pl-10 pr-4 py-2"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Liste des patients */}
      <div className="glass-panel rounded-lg divide-y divide-border">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => handlePatientClick(patient)}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              <div>
                <h3 className="font-medium">{patient.nom} {patient.prenom}</h3>
              </div>

              <div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    patient.stroke === 1
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}
                >
                  {patient.stroke === 1 ? t('risk.high') : t('risk.low')}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            {t('patient.list.noPatientsFound')}
          </div>
        )}
      </div>

      {/* Pop-up des détails du patient */}
      <Dialog open={!!selectedPatient} onOpenChange={(open) => !open && setSelectedPatient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('patient.details.title')}</DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="py-4 space-y-4">
              {/* Informations du patient */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-medium">{selectedPatient.nom}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Prénom</p>
                  <p className="font-medium">{selectedPatient.prenom}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Âge</p>
                  <p className="font-medium">{selectedPatient.age}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Hypertension</p>
                  <p className="font-medium">{selectedPatient.hypertension ? "Oui" : "Non"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Cardiopathie</p>
                  <p className="font-medium">{selectedPatient.heart_disease ? "Oui" : "Non"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Glucose moyen</p>
                  <p className="font-medium">{selectedPatient.avg_glucose_level}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">IMC</p>
                  <p className="font-medium">{selectedPatient.bmi}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Type de travail</p>
                  <p className="font-medium">{getWorkTypeLabel(selectedPatient.work_type)}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Marié(e)</p>
                  <p className="font-medium">{selectedPatient.ever_married ? "Oui" : "Non"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Risque AVC</p>
                  <p
                    className={`font-medium ${
                      selectedPatient.stroke === 1
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {selectedPatient.stroke === 1 ? t('risk.high') : t('risk.low')}
                  </p>
                </div>
              </div>

              {/* Recommandations */}
              <div className="pt-4">
                <h3 className="text-lg font-bold mb-2">Recommandations</h3>
                <ul className="list-disc list-inside">
                  {getRecommendations(selectedPatient.stroke).map((rec, index) => (
                    <li key={index} className="text-sm">{rec}</li>
                  ))}
                </ul>
              </div>

              {/* Boutons */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="secondary-button"
                >
                  {t('patient.details.close')}
                </button>

                <button
                  onClick={handleExportPDF}
                  className="primary-button"
                >
                  {t('patient.details.exportPDF')}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientList;