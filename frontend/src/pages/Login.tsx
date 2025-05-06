
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import LoginForm from '../components/auth/LoginForm';
import { Globe, Moon, Sun } from 'lucide-react';

const Login = () => {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  // If already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
        <div className="max-w-md text-primary-foreground p-8">
          <h1 className="text-3xl font-bold mb-6">MedRisk</h1>
          <p className="text-xl mb-6">
            A comprehensive stroke risk assessment platform for healthcare professionals.
          </p>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-sm opacity-90">
              "This platform has streamlined our patient assessment process and helped us identify high-risk individuals more effectively."
            </p>
            <p className="mt-4 font-medium">MASTER 2IA</p>
            <p className="text-sm opacity-70">FS Kenitra</p>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={20} />
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label={theme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
        
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-3xl font-bold text-primary">MedRisk</h1>
            <p className="text-muted-foreground mt-2">
              Stroke risk assessment platform
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
