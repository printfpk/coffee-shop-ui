import { useState, useEffect, useCallback } from 'react';
import { Facebook, Twitter, Instagram, ChevronUp, ChevronDown } from 'lucide-react';
import { coffeeTypes } from './types/coffee';
import { CoffeeScene } from './components/CoffeeScene';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  const currentCoffee = coffeeTypes[currentIndex];

  const goToSlide = useCallback((index: number, dir: 'up' | 'down') => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setDirection(dir);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 300);
  }, [isAnimating, currentIndex]);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % coffeeTypes.length;
    goToSlide(nextIndex, 'down');
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + coffeeTypes.length) % coffeeTypes.length;
    goToSlide(prevIndex, 'up');
  }, [currentIndex, goToSlide]);

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with smooth transition */}
      <div 
        className={`absolute inset-0 transition-colors duration-700 ease-out ${currentCoffee.bgColor}`}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex h-full">
        
        {/* Left Panel - Image Section */}
        <div className="relative w-1/2 h-full overflow-hidden">
          {/* Logo */}
          <div className="absolute top-8 left-8 z-20 flex items-center gap-2">
            <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              <ellipse cx="12" cy="12" rx="3" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 7c-2 0-3 2-3 5s1 5 3 5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span className="font-serif text-sm font-medium text-white/80 tracking-wider">
              Coffee Flavours
            </span>
          </div>

          {/* SCROLL DOWN indicator */}
          <div className="absolute left-6 bottom-12 z-20 flex flex-col items-center gap-3">
            <div className="w-px h-16 bg-white/30" />
            <span 
              className="text-[10px] text-white/50 tracking-[0.2em] uppercase"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Scroll Down
            </span>
          </div>

          {/* Image Container with Animation */}
          <div className="relative w-full h-full flex items-center justify-center">
            {coffeeTypes.map((coffee, index) => (
              <div
                key={coffee.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <CoffeeScene 
                  mainImage={coffee.image} 
                  isActive={index === currentIndex} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Content Section */}
        <div className="relative w-1/2 h-full bg-[#f5f0e8]">
          {/* Social Icons */}
          <div className="absolute top-8 right-8 flex items-center gap-4">
            <button className="w-8 h-8 rounded-full border border-[#d4c4b0] flex items-center justify-center text-[#8b7768] hover:bg-[#e8dcc8] transition-colors duration-300">
              <Facebook className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 rounded-full border border-[#d4c4b0] flex items-center justify-center text-[#8b7768] hover:bg-[#e8dcc8] transition-colors duration-300">
              <Twitter className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 rounded-full border border-[#d4c4b0] flex items-center justify-center text-[#8b7768] hover:bg-[#e8dcc8] transition-colors duration-300">
              <Instagram className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col justify-center px-20 pr-28">
            {/* Coffee Type Counter */}
            <div className="mb-4">
              <span className="text-xs text-[#8b7768] tracking-widest">
                {String(currentIndex + 1).padStart(2, '0')} / {String(coffeeTypes.length).padStart(2, '0')}
              </span>
            </div>

            {/* Coffee Name with Animation */}
            <div className="relative h-16 mb-4 overflow-hidden">
              {coffeeTypes.map((coffee, index) => (
                <h1
                  key={coffee.id}
                  className={`absolute inset-0 font-serif text-4xl font-semibold text-[#3d3229] transition-all duration-500 ease-out ${
                    index === currentIndex
                      ? 'opacity-100 translate-y-0'
                      : direction === 'down'
                      ? index < currentIndex
                        ? 'opacity-0 -translate-y-full'
                        : 'opacity-0 translate-y-full'
                      : index > currentIndex
                      ? 'opacity-0 translate-y-full'
                      : 'opacity-0 -translate-y-full'
                  }`}
                >
                  {coffee.name}
                </h1>
              ))}
            </div>

            {/* Coffee Description with Animation */}
            <div className="relative h-20 mb-8 overflow-hidden">
              {coffeeTypes.map((coffee, index) => (
                <p
                  key={coffee.id}
                  className={`absolute inset-0 text-[#6b5a4a] text-sm leading-relaxed max-w-sm transition-all duration-500 ease-out delay-75 ${
                    index === currentIndex
                      ? 'opacity-100 translate-y-0'
                      : direction === 'down'
                      ? index < currentIndex
                        ? 'opacity-0 -translate-y-full'
                        : 'opacity-0 translate-y-full'
                      : index > currentIndex
                      ? 'opacity-0 translate-y-full'
                      : 'opacity-0 -translate-y-full'
                  }`}
                >
                  {coffee.description}
                </p>
              ))}
            </div>

            {/* CTA Button with Animation */}
            <div className="relative h-10 overflow-hidden">
              {coffeeTypes.map((coffee, index) => (
                <div
                  key={coffee.id}
                  className={`absolute inset-0 transition-all duration-500 ease-out delay-100 ${
                    index === currentIndex
                      ? 'opacity-100 translate-y-0'
                      : direction === 'down'
                      ? index < currentIndex
                        ? 'opacity-0 -translate-y-full'
                        : 'opacity-0 translate-y-full'
                      : index > currentIndex
                      ? 'opacity-0 translate-y-full'
                      : 'opacity-0 -translate-y-full'
                  }`}
                >
                  <button 
                    className="px-8 py-2.5 bg-[#c4a77d] text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#b89b6f] transition-colors duration-300"
                  >
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Color Palette Selector */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            {/* Up Arrow */}
            <button 
              onClick={prevSlide}
              className="w-6 h-6 flex items-center justify-center text-[#a08060] hover:text-[#6b5a4a] transition-colors"
              disabled={isAnimating}
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* Color Dots */}
            <div className="flex flex-col gap-2">
              {coffeeTypes.map((coffee, index) => (
                <button
                  key={coffee.id}
                  onClick={() => goToSlide(index, index > currentIndex ? 'down' : 'up')}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-1 ring-offset-1 ring-[#8b7768]'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: getCoffeeColor(index) }}
                  disabled={isAnimating}
                  aria-label={`Go to ${coffee.name}`}
                />
              ))}
            </div>

            {/* Down Arrow */}
            <button 
              onClick={nextSlide}
              className="w-6 h-6 flex items-center justify-center text-[#a08060] hover:text-[#6b5a4a] transition-colors"
              disabled={isAnimating}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get coffee colors for the palette dots
function getCoffeeColor(index: number): string {
  const colors = [
    '#6b7280', // Black Coffee - gray
    '#c4a77d', // Espresso - golden tan
    '#8b6914', // Mocha - brown
    '#e8dcc8', // Latte - cream
    '#a08060', // Macchiato - caramel
  ];
  return colors[index];
}

export default App;
