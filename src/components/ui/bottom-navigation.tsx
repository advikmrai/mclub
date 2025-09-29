import { Link, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 group">
      {/* Hover trigger area - small visible tab */}
      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-t-md opacity-50 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-1 bg-[hsl(var(--gold-400))] rounded"></div>
      </div>
      
      {/* Main navigation menu */}
      <div className="bg-primary text-primary-foreground px-6 py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg">
        <nav className="flex space-x-6">
          <Link 
            to="/" 
            className={`hover:text-[hsl(var(--gold-400))] transition-colors ${
              location.pathname === '/' ? 'text-[hsl(var(--gold-400))]' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/schedule" 
            className={`hover:text-[hsl(var(--gold-400))] transition-colors ${
              location.pathname === '/schedule' ? 'text-[hsl(var(--gold-400))]' : ''
            }`}
          >
            Schedule
          </Link>
        </nav>
      </div>
    </div>
  );
};