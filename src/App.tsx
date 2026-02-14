import { useState, useEffect, useCallback } from 'react';
import { ChevronUp, ChevronDown, Search, ShoppingBag, X, Menu } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { coffeeTypes } from './types/coffee';
import { CoffeeScene } from './components/CoffeeScene';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeModal, setActiveModal] = useState<'search' | 'menu' | 'story' | 'bag' | 'mobile-nav' | null>(null);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Complex modal animation variants
  const modalVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20, 
      filter: "blur(10px)",
      rotateX: 10,
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: "blur(0px)",
      rotateX: 0,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20, 
      filter: "blur(10px)",
      rotateX: -10,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const menuItems = {
    'Espresso': ['Single Origin', 'Americano', 'Cortado', 'Flat White'],
    'Signature': ['Caramel Macchiato', 'Hazelnut Latte', 'Vanilla Bean', 'Honey Lavender'],
    'Seasonal': ['Pumpkin Spice', 'Peppermint Mocha', 'Maple Pecan', 'Gingerbread'],
    'Pastries': ['Butter Croissant', 'Blueberry Muffin', 'Cinnamon Roll', 'Scone']
  };

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
      <div className="relative z-10 flex h-full max-md:flex-col">
        
        {/* Global Split Navbar */}
        <div className="absolute top-0 left-0 w-full z-50 flex h-24 pointer-events-none max-md:justify-between">
          {/* Left Side - Logo */}
          <div className="w-1/2 max-md:w-auto h-full flex items-center px-12 max-md:px-6 pointer-events-auto">
             <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  <ellipse cx="12" cy="12" rx="3" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 7c-2 0-3 2-3 5s1 5 3 5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold text-white tracking-widest leading-none">
                    COFFEE
                  </span>
                  <span className="text-[0.6rem] text-white/70 uppercase tracking-[0.2em] leading-none">
                    House
                  </span>
                </div>
             </div>
          </div>

          {/* Right Side - Navigation & Actions */}
          <div className="w-1/2 max-md:w-auto h-full flex items-center justify-end px-12 max-md:px-6 pointer-events-auto">
            <div className="flex items-center gap-12 max-md:gap-4 bg-white/80 backdrop-blur-md px-10 max-md:px-4 py-4 max-md:py-2 rounded-full shadow-sm">
                <nav className="flex items-center gap-8 max-md:hidden">
                  {['Home', 'Menu', 'Story', 'Shop'].map((item) => (
                    <a 
                      key={item} 
                      href={item === 'Shop' ? "https://www.instagram.com/printf_pk/" : "#"}
                      onClick={(e) => {
                         if (item === 'Menu') {
                            e.preventDefault();
                            setHoveredCategory(null);
                            setActiveModal('menu');
                         }
                         if (item === 'Story') {
                           e.preventDefault();
                           setActiveModal('story');
                         }
                      }}
                      target={item === 'Shop' ? '_blank' : undefined}
                      className="text-xs font-bold uppercase tracking-widest text-[#8b7768] hover:text-[#3d3229] transition-colors relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8b7768] transition-all duration-300 group-hover:w-full" />
                    </a>
                  ))}
                </nav>
                
                <div className="flex items-center gap-6 max-md:gap-4">
                   <button 
                      onClick={() => setActiveModal('search')}
                      className="text-[#8b7768] hover:text-[#3d3229] transition-colors"
                   >
                      <Search className="w-5 h-5" />
                   </button>
                   <button 
                      onClick={() => setActiveModal('bag')}
                      className="text-[#8b7768] hover:text-[#3d3229] transition-colors relative"
                   >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#c4a77d] text-white text-[8px] flex items-center justify-center rounded-full">
                        2
                      </span>
                   </button>
                   <button 
                      onClick={() => setActiveModal('mobile-nav')}
                      className="hidden max-md:block text-[#8b7768] hover:text-[#3d3229] transition-colors"
                   >
                      <Menu className="w-5 h-5" />
                   </button>
                </div>
            </div>
          </div>
        </div>

        {/* Left Panel - Image Section */}
        <div className="relative w-1/2 max-md:w-full h-full max-md:h-1/2 overflow-hidden">
          {/* Note: Navbar is now global */}

          {/* SCROLL DOWN indicator */}
          <div className="absolute left-6 bottom-12 z-20 flex flex-col items-center gap-3 max-md:hidden">
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
                className="absolute inset-0 flex items-center justify-center pointer-events-none max-md:scale-[0.55]"
              >
                <CoffeeScene 
                  mainImage={coffee.image} 
                  isActive={index === currentIndex} 
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls - Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col max-md:flex-row items-center gap-2 bg-white rounded-full py-4 max-md:py-1.5 px-1 max-md:px-3 shadow-xl">
            {/* Up Arrow */}
            <button 
              onClick={prevSlide}
              className="w-6 h-6 flex items-center justify-center text-[#a08060] hover:text-[#6b5a4a] transition-colors"
              disabled={isAnimating}
            >
              <ChevronUp className="w-4 h-4 max-md:-rotate-90" />
            </button>

            {/* Color Dots */}
            <div className="flex flex-col gap-2 max-md:flex-row">
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
              <ChevronDown className="w-4 h-4 max-md:-rotate-90" />
            </button>
        </div>

        {/* Right Panel - Content Section */}
        <div className="relative w-1/2 max-md:w-full h-full max-md:h-1/2 bg-[#f5f0e8]">
          {/* Note: Navbar is now global */}

          {/* Content Container */}
          <div className="relative h-full flex flex-col justify-center px-20 max-md:px-8 pr-28 max-md:pr-8">
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
                  className={`absolute inset-0 font-serif text-4xl max-md:text-3xl font-semibold text-[#3d3229] transition-all duration-500 ease-out ${
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
                  className={`absolute inset-0 text-[#6b5a4a] text-sm leading-relaxed max-w-sm max-md:max-w-full transition-all duration-500 ease-out delay-75 ${
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
                  <motion.a 
                    href="https://www.instagram.com/printf_pk/"
                    target="_blank"
                    className="inline-block px-8 py-2.5 text-white text-xs font-medium tracking-[0.15em] uppercase hover:opacity-90 transition-all duration-300 rounded-full shadow-md"
                    style={{ backgroundColor: getCoffeeColor(index) }}
                    initial="initial"
                    whileHover="hover"
                  >
                    <motion.span
                      className="block"
                      variants={{
                        initial: { y: 0 },
                        hover: { 
                          y: [0, -5, 0],
                          transition: { 
                             duration: 0.3,
                             ease: "easeInOut" 
                          } 
                        }
                      }}
                    >
                      Order Now
                    </motion.span>
                  </motion.a>
                </div>
              ))}
            </div>

      {/* Modal Overlay System */}
      <AnimatePresence>
        {activeModal && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-md"
              onClick={() => {
                setActiveModal(null);
                setHoveredCategory(null);
              }}
            />

            {/* Menu Preview Side Panel */}
            <AnimatePresence mode='wait'>
              {activeModal === 'menu' && hoveredCategory && (
                <motion.div
                  key={hoveredCategory}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-28 right-[27rem] max-md:fixed max-md:top-auto max-md:bottom-[34rem] max-md:left-4 max-md:right-4 max-md:w-auto max-md:translate-x-0 max-md:translate-y-0 z-[80] w-60 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/40 max-md:max-h-[35vh] max-md:overflow-y-auto"
                >
                  <div className="relative mb-4">
                    <motion.h4 
                      className="text-xs font-bold uppercase tracking-widest text-[#8b7768] pb-2"
                    >
                      {hoveredCategory}
                    </motion.h4>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[1px] bg-[#8b7768]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                  <ul className="space-y-3">
                    {menuItems[hoveredCategory as keyof typeof menuItems].map((item, idx) => (
                      <motion.li 
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-sm text-[#3d3229] font-medium flex items-center gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c4a77d]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modal Content container - same position for all */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`absolute top-28 right-32 z-[70] w-72 bg-white rounded-2xl shadow-2xl p-6 overflow-hidden ${
                activeModal === 'mobile-nav' 
                  ? 'max-md:fixed max-md:top-24 max-md:left-0 max-md:right-0 max-md:m-0 max-md:w-full max-md:rounded-none max-md:border-t max-md:border-black/5' 
                  : 'max-md:right-4 max-md:left-4 max-md:top-auto max-md:bottom-28 max-md:w-auto'
              }`}
            >
              <div className="flex justify-between items-center mb-4 pb-2 relative">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8b7768]">
                  {activeModal === 'search' && 'Select Coffee'}
                  {activeModal === 'menu' && 'Our Menu'}
                  {activeModal === 'story' && 'Our Story'}
                  {activeModal === 'bag' && 'Your Bag'}
                  {activeModal === 'mobile-nav' && 'Navigation'}
                </span>
                <button 
                  onClick={() => {
                    setActiveModal(null);
                    setHoveredCategory(null);
                  }}
                  className="text-[#8b7768] hover:text-[#3d3229]"
                >
                  <X className="w-4 h-4" />
                </button>
                <motion.div 
                  className="absolute bottom-0 left-0 h-[1px] bg-[#8b7768]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
              
              <div className={`flex flex-col gap-1 overflow-y-auto pr-1 ${activeModal === 'mobile-nav' ? 'max-h-[75vh]' : 'max-h-[300px]'}`}>
                {/* SEARCH MODAL CONTENT */}
                {activeModal === 'search' && coffeeTypes.map((coffee, index) => (
                  <motion.button
                    key={coffee.id}
                    onClick={() => {
                        goToSlide(index, index > currentIndex ? 'down' : 'up');
                        setActiveModal(null);
                    }}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    variants={{
                      initial: { opacity: 0, x: -20 },
                      animate: { 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.05 } 
                      },
                      hover: { 
                        scale: 1.02, 
                        x: 5,
                        backgroundColor: "rgba(245, 240, 232, 1)", 
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg text-left w-full relative overflow-hidden"
                  >
                     <motion.div 
                      variants={{ hover: { x: ["-100%", "200%"] } }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -z-1" 
                    />

                    <div className="relative w-8 h-8 z-10 flex-shrink-0">
                      {/* Pouring Stream Animation */}
                      <motion.div
                        className="absolute top-[40%] left-[8px] w-1.5 bg-[#3d3229] rounded-b-full origin-top"
                        initial={{ height: 0, opacity: 0 }}
                        variants={{
                          hover: { 
                            height: 22, 
                            opacity: 1,
                            transition: { delay: 0.1, duration: 0.3 }
                          }
                        }}
                        style={{ zIndex: 0 }} 
                      />
                      
                      {/* Cup Container */}
                      <motion.div 
                        className="relative w-full h-full rounded-full bg-[#f5f0e8] overflow-hidden"
                        variants={{ hover: { rotate: -60, scale: 1.1 } }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        style={{ zIndex: 10 }}
                      >
                        <img src={coffee.image} alt={coffee.name} className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                    
                    <motion.span 
                      className={`text-sm font-medium z-10 ${index === currentIndex ? 'text-[#3d3229]' : 'text-[#8b7768]'}`}
                      variants={{ hover: { color: "#3d3229", x: 5, textShadow: "0px 0px 8px rgba(196,167,125,0.5)" } }}
                    >
                      {coffee.name}
                    </motion.span>
                  </motion.button>
                ))}

                {/* MENU MODAL CONTENT */}
                {activeModal === 'menu' && (
                   <div className="space-y-4" onMouseLeave={() => setHoveredCategory(null)}>
                      {Object.keys(menuItems).map((category) => (
                         <motion.div 
                            key={category} 
                            className="p-3 bg-[#f5f0e8] rounded-xl cursor-pointer relative overflow-hidden"
                            onMouseEnter={() => setHoveredCategory(category)}
                            onClick={() => setHoveredCategory(category)}
                            whileHover={{ 
                                scale: 1.02,  
                                backgroundColor: "rgba(232, 224, 213, 1)", 
                                x: 5
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                         >
                            <h3 className="text-sm font-semibold text-[#3d3229] mb-1 relative z-10">{category}</h3>
                            <p className="text-[10px] text-[#8b7768] relative z-10">Explore our {category.toLowerCase()} selection</p>
                            
                            {/* Hover highlight decorative line */}
                            <motion.div 
                                className="absolute left-0 top-0 bottom-0 w-1 bg-[#c4a77d]" 
                                initial={{ scaleY: 0 }}
                                whileHover={{ scaleY: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                         </motion.div>
                      ))}
                   </div>
                )}

                {/* STORY MODAL CONTENT */}
                {activeModal === 'story' && (
                   <div className="space-y-3 text-[#6b5a4a]">
                      <motion.p 
                        className="text-xs leading-relaxed"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.02 } }
                        }}
                      >
                        {"Founded in 2024, Coffee House began with a simple mission: to serve the perfect cup in a space that feels like home.".split("").map((char, index) => (
                          <motion.span
                            key={index}
                            variants={{
                              hidden: { opacity: 0 },
                              visible: { opacity: 1 }
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.p>
                      <motion.p 
                        className="text-xs leading-relaxed"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.02, delayChildren: 2.3 } }
                        }}
                      >
                         {"Every bean is ethically sourced, every roast is carefully monitored, and every cup is brewed with passion.".split("").map((char, index) => (
                           <motion.span
                             key={index}
                             variants={{
                               hidden: { opacity: 0 },
                               visible: { opacity: 1 }
                             }}
                           >
                             {char}
                           </motion.span>
                         ))}
                      </motion.p>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 4.5, duration: 0.5 }}
                        className="h-24 bg-[#f5f0e8] rounded-xl flex items-center justify-center mt-2"
                      >
                         <span className="font-serif italic text-[#8b7768]">Est. 2024</span>
                      </motion.div>
                   </div>
                )}

                {/* BAG MODAL CONTENT */}
                {activeModal === 'bag' && (
                   <div className="flex flex-col h-full">
                      <div className="flex-1 space-y-3">
                         {/* Fake Items */}
                         <div className="flex gap-3 items-center p-2 border-b border-[#f5f0e8]">
                            <div className="w-10 h-10 bg-[#f5f0e8] rounded-md"></div>
                            <div className="flex-1">
                               <p className="text-xs font-bold text-[#3d3229]">Caramel Latte</p>
                               <p className="text-[10px] text-[#8b7768]">Medium • Oat Milk</p>
                            </div>
                            <span className="text-xs font-semibold text-[#3d3229]">$4.50</span>
                         </div>
                         <div className="flex gap-3 items-center p-2 border-b border-[#f5f0e8]">
                            <div className="w-10 h-10 bg-[#f5f0e8] rounded-md"></div>
                            <div className="flex-1">
                               <p className="text-xs font-bold text-[#3d3229]">Chocolate Croissant</p>
                               <p className="text-[10px] text-[#8b7768]">Warm</p>
                            </div>
                            <span className="text-xs font-semibold text-[#3d3229]">$3.75</span>
                         </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#f5f0e8]">
                         <div className="flex justify-between mb-4">
                            <span className="text-xs font-bold text-[#3d3229]">Total</span>
                            <span className="text-xs font-bold text-[#3d3229]">$8.25</span>
                         </div>
                         <a 
                           href="https://www.instagram.com/printf_pk/"
                           target="_blank"
                           className="block w-full text-center py-2 bg-[#c4a77d] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#b89b6f] transition-colors"
                         >
                            Checkout
                         </a>
                      </div>
                   </div>
                )}
                
                 {/* MOBILE NAV CONTENT */}
                 {activeModal === 'mobile-nav' && (
                  <div className="flex flex-col gap-4 py-2">
                    {['Home', 'Menu', 'Story', 'Shop'].map((item, idx) => (
                      <div key={item}>
                        <motion.a 
                          href={item === "Shop" ? "https://www.instagram.com/printf_pk/" : "#"}
                          target={item === "Shop" ? "_blank" : undefined}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={(e) => {
                             if (item === 'Menu') {
                                e.preventDefault();
                                setHoveredCategory(null);
                                setActiveModal('menu');
                             } else if (item === 'Story') {
                               e.preventDefault();
                               setActiveModal('story');
                             } else if (item === 'Shop') {
                               // Allow default behavior for Shop (link)
                               setActiveModal(null);
                             } else {
                               e.preventDefault();
                               setActiveModal(null);
                             }
                          }}
                          className="text-lg font-serif font-bold text-[#3d3229] hover:text-[#8b7768] transition-colors flex items-center justify-between group"
                        >
                          {item}
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c4a77d] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                      </div>
                    ))}
                  </div>
                )}


              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
