import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from "sonner";
import { addPatient } from '../../utils/api';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const initialFormState = {
  firstName: "",
  lastName: "",
  age: 0,
  hypertension: false,
  heartDisease: false,
  everMarried: false,
  workType: 'private',
  glucoseLevel: "00,00", // Chaîne de caractères pour permettre la virgule
  bmi: "00,00", // Chaîne de caractères pour permettre la virgule
};

const workTypeOptions = [
  { label: "Private", value: "private" },
  { label: "Govt_job", value: "govt" },
  { label: "Self-employed", value: "selfEmployed" },
  { label: "Children", value: "children" },
];

interface PatientFormProps {
  onPatientAdded?: (patient: any) => void;
}

const PatientForm = ({ onPatientAdded }: PatientFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialFormState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<boolean | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'glucoseLevel' || name === 'bmi') {
      // Valider l'entrée pour les nombres avec virgule
      const validatedValue = value.replace(/[^0-9,]/g, ''); // Autoriser uniquement les chiffres et la virgule
      setFormData(prev => ({ ...prev, [name]: validatedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Préparer les données pour l'API
      const payload = {
        nom: formData.firstName,
        prenom: formData.lastName,
        age: parseFloat(formData.age),
        hypertension: formData.hypertension ? 1 : 0,
        heart_disease: formData.heartDisease ? 1 : 0,
        avg_glucose_level: parseFloat(formData.glucoseLevel.replace(',', '.')), // Convertir la virgule en point
        bmi: parseFloat(formData.bmi.replace(',', '.')), // Convertir la virgule en point
        ever_married: formData.everMarried ? 1 : 0,
        work_type: formData.workType === 'private' ? 2 :
                   formData.workType === 'govt' ? 0 :
                   formData.workType === 'selfEmployed' ? 3 : 1,
      };
  
      // Appel API
      const response = await addPatient(payload);
      setAssessmentResult(response.stroke); // Résultat de l'évaluation
      setRecommendations(response.recommendations || []); // Recommandations
      setIsDialogOpen(true);
  
      // Notifier le parent (si nécessaire)
      if (onPatientAdded) {
        onPatientAdded({
          id: `p${Date.now()}`,
          ...payload,
          strokeRisk: response.stroke,
          assessmentDate: new Date().toISOString(),
        });
      }
  
      toast.success('Patient assessment saved successfully');
    } catch (error: any) {
      toast.error(error.error || 'Failed to save patient assessment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Informations personnelles */}
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.firstName')}</h3>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="form-input"
        required
      />
    </div>
    
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.lastName')}</h3>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="form-input"
        required
      />
    </div>
    
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.age')}</h3>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        min="1"
        max="120"
        className="form-input"
        required
      />
    </div>
    
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.workType')}</h3>
      <select
        name="workType"
        value={formData.workType}
        onChange={handleChange}
        className="form-input"
        required
      >
        {workTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {t(`patient.form.workType.${option.value}`)}
          </option>
        ))}
      </select>
    </div>
    
    {/* Informations de santé */}
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.glucoseLevel')}</h3>
      <input
        type="text"
        name="glucoseLevel"
        value={formData.glucoseLevel}
        onChange={handleChange}
        className="form-input"
        required
        pattern="[0-9,]*"
        title="Veuillez entrer un nombre avec une virgule (ex: 83,94)"
      />
    </div>
    
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.bmi')}</h3>
      <input
        type="text"
        name="bmi"
        value={formData.bmi}
        onChange={handleChange}
        className="form-input"
        required
        pattern="[0-9,]*"
        title="Veuillez entrer un nombre avec une virgule (ex: 28,89)"
      />
    </div>
    
    {/* Champs booléens */}
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.hypertension')}</h3>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hypertension"
            checked={formData.hypertension}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>{t('patient.form.yes')}</span>
        </label>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.heartDisease')}</h3>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="heartDisease"
            checked={formData.heartDisease}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>{t('patient.form.yes')}</span>
        </label>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{t('patient.form.everMarried')}</h3>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="everMarried"
            checked={formData.everMarried}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>{t('patient.form.yes')}</span>
        </label>
      </div>
    </div>
  </div>
  
  <div className="flex justify-center pt-4">
    <button
      type="submit"
      className="primary-button min-w-[200px]"
      disabled={isLoading}
    >
      {isLoading ? t('loading') : t('patient.form.evaluate')}
    </button>
  </div>
</form>

      {/* Pop-up des résultats */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('assessment.result.title')}</DialogTitle>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            {assessmentResult ? (
              <>
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-xl font-semibold text-red-500">
                  {t('assessment.result.highRisk')}
                </h3>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-semibold text-green-500">
                  {t('assessment.result.lowRisk')}
                </h3>
              </>
            )}
            {/* Affichage des recommandations */}
            {recommendations.length > 0 && (
              <div className="text-left w-full">
                <h3 className="text-lg font-bold mb-2">{t('assessment.result.recommendations')}</h3>
                <ul className="list-disc list-inside">
                  {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientForm;