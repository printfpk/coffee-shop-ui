import { motion, type Variants } from 'framer-motion';

interface CoffeeSceneProps {
    mainImage: string;
    isActive: boolean;
}

export function CoffeeScene({ mainImage, isActive }: CoffeeSceneProps) {
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
    const grainsVariants: Variants = {
        active: {
            y: 0,
            x: 0,
            rotate: -10,
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
            rotate: -45,
            opacity: 0,
            transition: {
                duration: 0.6,
                ease: "easeIn"
            }
        }
    };

    return (
        <motion.div 
            className="relative w-[30rem] h-[30rem] flex items-center justify-center"
            variants={containerVariants}
            initial="inactive"
            animate={isActive ? "active" : "inactive"}
        >
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

            {/* Coffee Grains - Bottom Left Position */}
            <motion.img
                src="/images/grains.png"
                alt="Coffee Grains"
                className="absolute w-56 h-auto bottom-12 left-8 z-30 drop-shadow-xl"
                variants={grainsVariants}
            />
        </motion.div>
    );
}
