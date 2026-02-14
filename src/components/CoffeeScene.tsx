import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';

interface CoffeeSceneProps {
    mainImage: string;
    isActive: boolean;
    index: number;
}

export function CoffeeScene({ mainImage, isActive, index }: CoffeeSceneProps) {
    const containerVariants: Variants = {
        active: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        inactive: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    // Spoon: Exits falling down and to the right
    const spoonVariants: Variants = {
        active: {
            y: 0,
            x: 0,
            rotate: 15,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        },
        inactive: {
            y: 300,
            x: 100,
            rotate: 60,
            opacity: 0,
            transition: {
                duration: 0.6,
                ease: "easeIn"
            }
        }
    };

    // Leaf configuration based on index
    const leafConfig = useMemo(() => {
        const position = index % 4;
        switch (position) {
            case 0: // Top Left
                return {
                    className: "top-10 -left-6",
                    inactive: { x: -200, y: -200, rotate: -180 },
                    active: { x: 0, y: 0, rotate: -45 }
                };
            case 1: // Top Right
                return {
                    className: "top-10 -right-6",
                    inactive: { x: 200, y: -200, rotate: 180 },
                    active: { x: 0, y: 0, rotate: 45 }
                };
            case 2: // Bottom Right
                return {
                    className: "bottom-10 -right-6",
                    inactive: { x: 200, y: 200, rotate: 180 },
                    active: { x: 0, y: 0, rotate: 45 }
                };
            case 3: // Bottom Left
                return {
                    className: "bottom-10 -left-6",
                    inactive: { x: -200, y: 200, rotate: -180 },
                    active: { x: 0, y: 0, rotate: -45 }
                };
            default:
                return {
                    className: "top-10 -left-6",
                    inactive: { x: -200, y: -200, rotate: -180 },
                    active: { x: 0, y: 0, rotate: -45 }
                };
        }
    }, [index]);

    // Leaf: Exits floating to its specific corner
    const leafVariants: Variants = {
        active: {
            ...leafConfig.active,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 80,
            }
        },
        inactive: {
            ...leafConfig.inactive,
            opacity: 0,
            transition: {
                duration: 0.7,
                ease: "easeIn"
            }
        }
    };

    // Cup: Exits falling straight down
    const cupVariants: Variants = {
        active: {
            y: 0,
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        },
        inactive: {
            y: 400,
            scale: 0.8,
            opacity: 0,
            transition: {
                duration: 0.6,
                ease: "easeIn"
            }
        }
    };

    // Grains: Exits falling down and to the left
    const grainsVariants = (custom: { rotate: number }): Variants => ({
        active: {
            y: 0,
            x: 0,
            rotate: custom.rotate || -10,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        },
        inactive: {
            y: 300,
            x: -100,
            rotate: (custom.rotate || -10) - 45,
            opacity: 0,
            transition: {
                duration: 0.6,
                ease: "easeIn"
            }
        }
    });

    const grainPositions = [
        { className: "w-8 bottom-16 left-10 z-30", rotate: -15 },
        { className: "w-6 bottom-20 left-6 z-20", rotate: 45 },
        { className: "w-5 bottom-14 left-16 z-30", rotate: -30 },
        { className: "w-7 bottom-10 right-14 z-30", rotate: 10 },
        { className: "w-6 bottom-18 right-8 z-20", rotate: 90 },
        { className: "w-7 bottom-12 left-32 z-30", rotate: 120 },
        { className: "w-5 bottom-22 left-12 z-10", rotate: -60 },
        { className: "w-6 bottom-16 right-10 z-10", rotate: 25 },
        { className: "w-7 bottom-10 right-24 z-30", rotate: -15 },
        { className: "w-5 bottom-12 left-20 z-30", rotate: 180 },
        { className: "w-6 bottom-14 right-16 z-20", rotate: 60 },
        { className: "w-5 bottom-24 left-14 z-10", rotate: -45 },
        // Added more copies as requested
        { className: "w-4 bottom-18 left-24 z-30", rotate: 15 },
        { className: "w-5 bottom-8 right-28 z-20", rotate: 75 },
        { className: "w-6 bottom-22 right-18 z-10", rotate: -20 },
    ];

    return (
        <motion.div 
            className="relative w-[30rem] h-[30rem] flex items-center justify-center"
            variants={containerVariants}
            initial="inactive"
            animate={isActive ? "active" : "inactive"}
        >
            {/* Leaf - Dynamic Position */}
            <motion.img
                src="/images/leaf.png"
                alt="Leaf"
                className={`absolute w-32 h-auto z-10 drop-shadow-lg ${leafConfig.className}`}
                variants={leafVariants}
            />

            {/* Spoon - Top Right Position */}
            <motion.img
                src="/images/spoon.png"
                alt="Spoon"
                className="absolute w-40 h-auto top-24 right-10 z-10 drop-shadow-lg"
                variants={spoonVariants}
            />

            {/* Main Cup - Center */}
            <motion.div
                className="relative z-20 w-80 h-80"
                variants={cupVariants}
            >
                <img
                    src={mainImage}
                    alt="Coffee Cup"
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </motion.div>

            {/* Coffee Grains - Scattered around */}
            {grainPositions.map((grain, index) => (
                <motion.img
                    key={index}
                    src="/images/grains.png"
                    alt="Coffee Grains"
                    className={`absolute h-auto drop-shadow-xl ${grain.className}`}
                    variants={grainsVariants(grain)}
                />
            ))}
        </motion.div>
    );
}
