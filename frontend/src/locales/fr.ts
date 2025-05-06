
const translations = {
  // Auth
  'login.title': 'Connectez-vous à votre compte',
  'login.email': 'Email',
  'login.password': 'Mot de passe',
  'login.submit': 'Connexion',
  'login.error': 'Email ou mot de passe invalide',
  'logout': 'Déconnexion',
  
  // Navigation
  'nav.dashboard': 'Tableau de bord',
  'nav.assessment': 'Évaluation',
  'nav.patients': 'Patients',
  
  // Dashboard
  'dashboard.title': 'Tableau de bord',
  'dashboard.welcome': 'Bienvenue',
  'dashboard.totalPatients': 'Patients totaux',
  'dashboard.highRiskPatients': 'Patients à haut risque',
  'dashboard.recentAssessments': 'Évaluations récentes',
  'riskDistribution': 'Distribution des risques',

  // Patient Form
  'patient.form.title': 'Évaluation du patient',
  'patient.form.firstName': 'Prénom',
  'patient.form.lastName': 'Nom',
  'patient.form.age': 'Âge',
  'patient.form.hypertension': 'Hypertension',
  'patient.form.heartDisease': 'Maladie cardiaque',
  'patient.form.everMarried': 'Déjà marié(e)',
  'patient.form.workType': 'Type de travail',
  'patient.form.glucoseLevel': 'Niveau de glucose moyen',
  'patient.form.bmi': 'IMC',
  'patient.form.evaluate': 'Évaluer',
  'patient.form.yes': 'Oui',
  'patient.form.no': 'Non',
  'patient.form.workType.children': 'Enfants',
  'patient.form.workType.govt': 'Gouvernement',
  'patient.form.workType.neverWorked': 'Jamais travaillé',
  'patient.form.workType.private': 'Privé',
  'patient.form.workType.selfEmployed': 'Indépendant',
  
  // Assessment Results
  'assessment.result.title': 'Résultat de l\'évaluation',
  'assessment.result.highRisk': 'Risque élevé d\'AVC',
  'assessment.result.lowRisk': 'Faible risque d\'AVC',
  'assessment.result.message.high': 'Ce patient présente des indicateurs de risque élevé d\'AVC.',
  'assessment.result.message.low': 'Ce patient présente des indicateurs de faible risque d\'AVC.',
  'assessment.result.close': 'Fermer',
  
  // Patient List
  'patient.list.title': 'Liste des patients',
  'patient.list.search': 'Rechercher des patients',
  'patient.list.name': 'Nom',
  'patient.list.risk': 'Statut de risque',
  'patient.details.title': 'Détails du patient',
  'patient.details.exportPDF': 'Exporter en PDF',
  'patient.details.close': 'Fermer',
  
  // Risk Status
  'risk.high': 'Risque élevé',
  'risk.low': 'Risque faible',
  
  // General
  'loading': 'Chargement...',
  'error': 'Une erreur est survenue',
  'save': 'Sauvegarder',
  'cancel': 'Annuler',
  'settings': 'Paramètres',
  'theme': 'Thème',
  'language': 'Langue',

   // Dashboard
   'hypertension': 'Hypertension',
   'heartDisease': 'Maladies cardiaques',
   'highGlucose': 'Glucose élevé',
   'highBMI': 'IMC élevé',
   'strokeCount': 'Nombre d\'AVC',
   'strokeByWorkType': 'AVC par type de travail',
   'strokeByMarried': 'AVC par statut marital',
 
   // Chart Labels
   'chart.workType.govt': 'Gouvernement',
   'chart.workType.children': 'Enfants',
   'chart.workType.private': 'Privé',
   'chart.workType.selfEmployed': 'Indépendant',
   'chart.married.single': 'Célibataire',
   'chart.married.married': 'Marié(e)',
 
   // Recommendations
   'recommendations.highRisk': 'Recommandations pour les patients à haut risque',
   'recommendations.lowRisk': 'Recommandations pour les patients à faible risque',
 };

export default translations;
