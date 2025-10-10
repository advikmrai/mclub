import { useState } from "react";
import { BottomNavigation } from "../components/ui/bottom-navigation"; // Using relative path as alias failed

type ScheduleView = 'default' | 'problemSet' | 'calendar';

const CALENDAR_IMAGE_URL = "https://i.ibb.co/whdxK9L3/IMG-1264.webp";
const NOTION_EMBED = `<iframe src="https://paagalpan.notion.site/ebd/288c478bf14381c0ad4dfa3a292b3e0d?v=288c478bf1438117b621000cd8afd5c0" width="100%" height="100%" frameborder="0" allowfullscreen />`;


const Schedule = () => {
  const [currentView, setCurrentView] = useState<ScheduleView>('default');

  const isDefaultView = currentView === 'default';
  const isContentSelected = currentView !== 'default';

  const menuClass = isContentSelected 
    ? "lg:w-1/3 w-full lg:items-start transition-all duration-500" 
    : "lg:w-full w-full transition-all duration-500"; 
  
  const contentPanelClass = isContentSelected 
    ? "lg:w-4/5 w-full opacity-100 translate-x-0" 
    : "lg:w-0 w-full opacity-0 translate-x-full lg:translate-x-0 pointer-events-none";

  const menuAlignment = isDefaultView ? "text-center" : "text-left";


  const renderContentPanel = () => {
    switch (currentView) {
      case 'problemSet':
        return (
          <div className="w-full h-full p-4 overflow-auto">
            <h2 className="text-3xl font-bold text-primary mb-4 lg:hidden">Psets</h2>
            <div 
              className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden" 
              style={{ minHeight: '600px' }} 
              dangerouslySetInnerHTML={{ __html: NOTION_EMBED }} 
            />
          </div>
        );
      case 'calendar':
        return (
          <div className="w-full h-full p-4 flex flex-col items-center justify-start">
             <h2 className="text-3xl font-bold text-primary mb-4 lg:hidden">Calendar</h2>
             <img 
               src={CALENDAR_IMAGE_URL} 
               alt="Math Club Calendar" 
               className="max-w-full max-h-full object-contain rounded-lg shadow-xl border border-gray-200"
               onError={(e) => {
                 e.currentTarget.onerror = null; 
                 e.currentTarget.src = "https://placehold.co/800x600/EF4444/ffffff?text=Image+Failed+to+Load";
               }}
             />
          </div>
        );
      case 'default':
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background relative">
      <div className="h-[calc(100vh-4rem)] border-4 border-primary relative rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        <div className={`flex flex-col p-6 items-center justify-center ${menuClass}`}> 
          <div className={`space-y-8 ${menuAlignment} w-full max-w-xs`}> 
            <h1 className={`text-4xl font-extrabold text-foreground transition-all duration-500 ${isDefaultView ? 'text-5xl' : 'text-3xl'}`}>
              Math Team Resources
            </h1>
            <div className="space-y-4">
              <button
                onClick={() => setCurrentView('calendar')}
                className="block text-2xl font-semibold text-primary hover:text-primary-darker hover:underline cursor-pointer transition-colors duration-200 focus:outline-none"
              >
                Calendar
              </button>
              <button
                onClick={() => setCurrentView('problemSet')}
                className="block text-2xl font-semibold text-primary hover:text-primary-darker hover:underline cursor-pointer transition-colors duration-200 focus:outline-none"
              >
                Problem Repository
              </button>
              
              
            </div>
          </div>
        </div>

        <div className={`h-full bg-gray-50 border-t-4 lg:border-t-0 lg:border-l-4 border-primary transition-all duration-500 ease-in-out overflow-hidden flex-shrink-0 ${contentPanelClass}`}>
          {renderContentPanel()}
        </div>

      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Schedule;
