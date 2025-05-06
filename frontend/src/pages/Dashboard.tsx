import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { Users, AlertTriangle, Calendar, Activity, Heart, Droplet, Scale } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import StrokeRiskChart from '../components/dashboard/StrokeRiskChart';
import { fetchStats } from '../utils/api';
import StrokeByWorkTypeChart from '../components/dashboard/StrokeByWorkTypeChart';
import StrokeByMarriedChart from '@/components/dashboard/StrokeByMarriedChart';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total_patients: 0,
    hypertension_count: 0,
    heart_disease_count: 0,
    high_glucose_count: 0,
    high_bmi_count: 0,
    stroke_count: 0,
    work_type_distribution: {},
    married_distribution: {},
    stroke_by_work_type: {},
    stroke_by_married: {},
    averages: { age: 0, glucose: 0, bmi: 0 },
    stroke_trend: [],
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error("Erreur de chargement des statistiques :", error);
      }
    };
    loadStats();
  }, []);

  // Préparer les données pour le graphique de risque d'AVC
  const strokeRiskData = [
    { name: t('risk.high'), value: stats.stroke_count },
    { name: t('risk.low'), value: stats.total_patients - stats.stroke_count },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('dashboard.welcome')}, {user?.email}
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalPatients')}
          value={stats.total_patients}
          icon={<Users size={24} />}
        />

        <StatCard
          title={t('hypertension')}
          value={stats.hypertension_count}
          icon={<AlertTriangle size={24} />}
        />

        <StatCard
          title={t('heartDisease')}
          value={stats.heart_disease_count}
          icon={<Heart size={24} />}
        />

        <StatCard
          title={t('highGlucose')}
          value={stats.high_glucose_count}
          icon={<Droplet size={24} />}
        />

        <StatCard
          title={t('highBMI')}
          value={stats.high_bmi_count}
          icon={<Scale size={24} />}
        />

        <StatCard
          title={t('strokeCount')}
          value={stats.stroke_count}
          icon={<Activity size={24} />}
        />
      </div>

      {/* Graphique de risque d'AVC */}
      <div className="glass-panel rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t('riskDistribution')}</h2>
        <StrokeRiskChart data={strokeRiskData} />
      </div>

      {/* Graphiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t('strokeByWorkType')}</h2>
          <StrokeByWorkTypeChart data={stats.stroke_by_work_type} />
        </div>

        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t('strokeByMarried')}</h2>
          <StrokeByMarriedChart data={stats.stroke_by_married} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;