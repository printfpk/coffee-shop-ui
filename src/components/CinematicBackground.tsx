import { motion } from 'framer-motion';

interface CinematicBackgroundProps {
    gradient: string;
    accentColor: string;
}

export function CinematicBackground({ gradient, accentColor }: CinematicBackgroundProps) {
    // Generate many small bubbles for foam texture
    const bubbles = Array.from({ length: 40 });
    
    // Generate flow lines for pouring effect
    const flowLines = Array.from({ length: 8 });

    return (
        <div className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ease-in-out bg-gradient-to-b ${gradient}`}>
            
            {/* Base liquid layer with subtle movement */}
            <motion.div 
                className="absolute inset-0 opacity-80 mix-blend-multiply"
                animate={{
                    backgroundPosition: ["0% 0%", "0% 100%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, ${accentColor}22, transparent)`,
                    backgroundSize: "100% 200%"
                }}
            />

            {/* Pouring Flow Lines */}
            {flowLines.map((_, i) => (
                <motion.div
                    key={`flow-${i}`}
                    className="absolute top-0 w-[2px] h-full"
                    style={{
                        left: `${10 + Math.random() * 80}%`,
                        background: `linear-gradient(to bottom, transparent, ${accentColor}44, transparent)`,
                        filter: 'blur(4px)',
                    }}
                    animate={{
                        y: ["-100%", "100%"],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Rising Foam Bubbles */}
            {bubbles.map((_, i) => {
                const size = 20 + Math.random() * 60;
                return (
                    <motion.div
                        key={`bubble-${i}`}
                        className="absolute rounded-full mix-blend-overlay"
                        style={{
                            width: size,
                            height: size,
                            backgroundColor: accentColor,
                            left: `${Math.random() * 100}%`,
                            bottom: -100,
                            filter: 'blur(8px)',
                        }}
                        animate={{
                            bottom: ["-10%", "110%"],
                            x: [0, (Math.random() - 0.5) * 50],
                            scale: [0.8, 1.2],
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    />
                );
            })}

            {/* Surface/Crema texture overlay */}
            <div 
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Top "Pouring" Wave Animation */}
            <motion.div
                className="absolute top-[-50%] left-[-20%] w-[140%] h-[100%] rounded-[40%] opacity-30 mix-blend-soft-light"
                style={{ backgroundColor: accentColor }}
                animate={{
                    rotate: [0, 360],
                    y: [0, 20, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            
            <motion.div
                className="absolute top-[-55%] right-[-20%] w-[140%] h-[100%] rounded-[45%] opacity-20 mix-blend-overlay"
                style={{ backgroundColor: '#ffffff' }}
                animate={{
                    rotate: [360, 0],
                    y: [0, -30, 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
}
