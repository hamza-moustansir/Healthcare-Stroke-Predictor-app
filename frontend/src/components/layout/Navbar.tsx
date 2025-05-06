
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Bell, Menu, Moon, Sun, Globe, X, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="glass-panel h-16 fixed top-0 left-0 right-0 z-50 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-secondary transition-colors"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <h1 className="ml-4 text-xl font-semibold">MedRisk</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md hover:bg-secondary transition-colors">
              <Globe size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-secondary' : ''}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('fr')} className={language === 'fr' ? 'bg-secondary' : ''}>
              Français
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-secondary transition-colors"
          aria-label={theme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <button className="p-2 rounded-md hover:bg-secondary transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 ml-4 p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {user?.email.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block max-w-[150px] truncate">{user?.email}</span>
            <ChevronDown size={16} />
          </button>
          
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 glass-panel rounded-md shadow-lg py-1 z-10 animate-fade-in">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-secondary transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
