import { BottomNavigation } from "../components/ui/bottom-navigation"; // Changed to relative path
import { useState, useEffect } from "react";

const IMAGE_SOURCES = [
  "https://i.ibb.co/zWS2MDS5/image0.jpg",
  "https://i.ibb.co/GfPcQKWV/image2.jpg",
  "https://i.ibb.co/WpsHcK3G/image5.jpg",
  "https://i.ibb.co/p6KJCP4H/image1.jpg",
  "https://i.ibb.co/DPrRndsY/image4.jpg",
  "https://i.ibb.co/zWN412hr/image7.jpg"
];

const Index = () => {
  // --- Typewriter State & Logic ---
  const words = ["Math.", "Competition.", "Problem Solving.", "Learning.", "People."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // --- Image Fading State ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Typewriter Effect
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


  // Image Fading Effect
  useEffect(() => {
    // Change image every 5000ms (5 seconds)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGE_SOURCES.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once

  return (
    <div className="min-h-screen p-8 bg-background relative">
      <div className="h-[calc(100vh-4rem)] border-4 border-primary relative rounded-xl overflow-hidden">
        {/* Image Background Container */}
        <div className="absolute inset-0">
          {IMAGE_SOURCES.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Math Club Visual ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-50" : "opacity-0" // opacity-30 for a dimmed look
              }`}
              // Fallback for image loading errors (uses the background color)
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#ccc';
                e.currentTarget.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent 1x1 GIF
              }}
            />
          ))}
        </div>
        
        {/* Overlay Content Container*/}
        <div className="relative w-full h-full p-4">
          
          {/* Typewriter text on left side */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-yellow">
              {currentText}
              <span className="animate-blink-full">|</span> {/* <--- CHANGE IS HERE */}
            </h2>
          </div>
          
          {/* Central area - currently empty, but here for structure */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              {/* Main central content area */}
            </div>
          </div>
          
          {/* Bottom right text box */}
          <div className="absolute bottom-4 right-4 max-w-xs z-20">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border-2 border-[hsl(var(--blue-400))] shadow-lg">
              <p className="text-sm text-gray-800 font-medium">
                The RHHS Math Club is where fun goes to thrive. Room 254, Ms. De la Mar. 
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Index;