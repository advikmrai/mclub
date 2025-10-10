import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

type LinkRef = {
  element: HTMLAnchorElement | null;
  path: string;
};

export const BottomNavigation = () => {
  const location = useLocation();
  const [flairStyle, setFlairStyle] = useState({});
  
  const homeRef = useRef<HTMLAnchorElement>(null);
  const scheduleRef = useRef<HTMLAnchorElement>(null);
  
  const navRef = useRef<HTMLElement>(null);

  const links: LinkRef[] = [
    { element: homeRef.current, path: "/" },
    { element: scheduleRef.current, path: "/schedule" },
  ];

  useEffect(() => {
    const activeLink = links.find(link => location.pathname === link.path);

    if (activeLink && activeLink.element && navRef.current) {
      const linkRect = activeLink.element.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      
      const left = linkRect.left - navRect.left + (linkRect.width / 2);
      
      setFlairStyle({
        transform: `translateX(-50%)`,
        left: `${left}px`,
        width: `${linkRect.width}px`,
      });
    }
  }, [location.pathname]); 

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 group">
      
      <div className="bg-primary text-primary-foreground px-3 pt-1 pb-1 rounded-t-lg shadow-lg relative">
        <div 
          className="absolute top-0 h-1 bg-[hsl(var(--gold-400))] rounded-full transition-all duration-300 ease-out" 
          style={flairStyle}
        ></div>
      </div>
      
      <div className="bg-primary text-primary-foreground px-6 py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg">
        <nav className="flex space-x-6 relative" ref={navRef}>
          <Link 
            ref={homeRef} 
            to="/" 
            className={`hover:text-[hsl(var(--gold-400))] transition-colors text-lg font-semibold ${
              location.pathname === '/' ? 'text-[hsl(var(--gold-400))]' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            ref={scheduleRef} 
            to="/schedule" 
            className={`hover:text-[hsl(var(--gold-400))] transition-colors text-lg font-semibold ${
              location.pathname === '/schedule' ? 'text-[hsl(var(--gold-400))]' : ''
            }`}
          >
            Info
          </Link>
        </nav>
      </div>
    </div>
  );
};