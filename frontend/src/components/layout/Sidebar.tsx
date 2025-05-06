
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, ClipboardList, Users } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { t } = useLanguage();
  
  return (
    <aside 
      className={`glass-panel fixed top-16 bottom-0 left-0 w-64 z-40 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="h-full flex flex-col p-4">
        <div className="space-y-1 flex-1">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <LayoutDashboard size={18} />
            <span>{t('nav.dashboard')}</span>
          </NavLink>
          
          <NavLink 
            to="/assessment" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <ClipboardList size={18} />
            <span>{t('nav.assessment')}</span>
          </NavLink>
          
          <NavLink 
            to="/patients" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Users size={18} />
            <span>{t('nav.patients')}</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
