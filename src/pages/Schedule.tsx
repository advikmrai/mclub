import { BottomNavigation } from "@/components/ui/bottom-navigation.tsx";

const Schedule = () => {
  return (
    <div className="min-h-screen p-8 bg-background relative">
      <div className="h-[calc(100vh-4rem)] border-4 border-primary relative">
        {/* Central area */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
            <div className="space-y-4">
              <div className="text-lg text-muted-foreground">Problem Set of the Week</div>
              <div className="text-lg text-muted-foreground">Calendar</div>
            </div>
          </div>
        </div>
        
        {/* Bottom right text box */}
        {/* <div className="absolute bottom-4 right-4 max-w-xs">
          <div className="bg-muted/50 p-4 rounded border-2 border-[hsl(var(--gold-400))]">
            <p className="text-sm text-muted-foreground">
              Schedule and weekly problems.
            </p>
          </div>
        </div> */}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Schedule;