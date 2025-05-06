
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl mt-4 mb-8">Page not found</p>
      <Link to="/dashboard" className="primary-button">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
