import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Helper type for link reference data
type LinkRef = {
  element: HTMLAnchorElement | null;
  path: string;
};

export const BottomNavigation = () => {
  const location = useLocation();
  const [flairStyle, setFlairStyle] = useState({});
  
  // Refs to track the link elements
  const homeRef = useRef<HTMLAnchorElement>(null);
  const scheduleRef = useRef<HTMLAnchorElement>(null);
  
  // Ref for the main navigation container to calculate relative position
  const navRef = useRef<HTMLElement>(null);

  // Array of link refs and their paths
  const links: LinkRef[] = [
    { element: homeRef.current, path: "/" },
    { element: scheduleRef.current, path: "/schedule" },
  ];

  // Effect to calculate and set the flair's position
  useEffect(() => {
    // Find the currently active link
    const activeLink = links.find(link => location.pathname === link.path);

    if (activeLink && activeLink.element && navRef.current) {
      const linkRect = activeLink.element.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      
      // Calculate position relative to the 'nav' element
      const left = linkRect.left - navRect.left + (linkRect.width / 2);
      
      setFlairStyle({
        transform: `translateX(-50%)`, // Center the flair over the calculated point
        left: `${left}px`,
        width: `${linkRect.width}px`, // Make the flair width match the link width
      });
    }
  }, [location.pathname]); // Re-calculate whenever the route changes

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 group">
      
      {/* 1. PERSISTENT INDICATOR AREA (Visible at all times) */}
      <div className="bg-primary text-primary-foreground px-3 pt-1 pb-1 rounded-t-lg shadow-lg relative">
        {/* Dynamic Flair Indicator */}
        <div 
          className="absolute top-0 h-1 bg-[hsl(var(--gold-400))] rounded-full transition-all duration-300 ease-out" 
          style={flairStyle}
        ></div>
      </div>
      
      <div className="bg-primary text-primary-foreground px-6 py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg">
        <nav className="flex space-x-6 relative" ref={navRef}>
          <Link 
            ref={homeRef} // Attach ref
            to="/" 
            className={`hover:text-[hsl(var(--gold-400))] transition-colors text-lg font-semibold ${
              location.pathname === '/' ? 'text-[hsl(var(--gold-400))]' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            ref={scheduleRef} // Attach ref
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