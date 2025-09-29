import { BottomNavigation } from "@/components/ui/bottom-navigation.tsx";
import { useState, useEffect } from "react";

const Index = () => {
  const words = ["Mathematics", "Problem Solving", "Competition", "Learning", "Discovery"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className="min-h-screen p-8 bg-background relative">
      <div className="h-[calc(100vh-4rem)] border-4 border-primary relative">
        {/* Typewriter text on left side */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
          <h2 className="text-4xl font-bold text-foreground">
            {currentText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>
        
        {/* Central area */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            {/* Main central content area */}
          </div>
        </div>
        
        {/* Bottom right text box */}
        <div className="absolute bottom-4 right-4 max-w-xs">
          <div className="bg-muted/50 p-4 rounded border-2 border-[hsl(var(--gold-400))]">
            <p className="text-sm text-muted-foreground">
              The RHHS Math Club is where fun goes to thrive. Room 254, Ms. De la Mar. 
            </p>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Index;