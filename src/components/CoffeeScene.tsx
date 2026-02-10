import { motion } from 'framer-motion';

interface CoffeeSceneProps {
    mainImage: string;
    isAnimating: boolean;
}

export function CoffeeScene({ mainImage, isAnimating }: CoffeeSceneProps) {
    return (
        <div className="relative w-[30rem] h-[30rem] flex items-center justify-center">
            {/* Spoon - Floats slowly and rotates slightly */}
            <motion.img
                src="/images/spoon.png"
                alt="Spoon"
                className="absolute w-40 h-auto -top-10 -right-4 z-10 opacity-90"
                initial={{ y: 0, rotate: 15 }}
                animate={{
                    y: [-15, 15, -15],
                    rotate: [15, 25, 15]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Main Cup - Floats vertically */}
            <motion.div
                className="relative z-20 w-80 h-80"
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <motion.img
                    src={mainImage}
                    alt="Coffee Cup"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    // Add an entrance animation when the image changes
                    key={mainImage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
            </motion.div>

            {/* Coffee Grains - Floats and rotates in opposite direction */}
            <motion.img
                src="/images/grains.png"
                alt="Coffee Grains"
                className="absolute w-56 h-auto -bottom-8 -left-8 z-30"
                initial={{ y: 0, rotate: -10 }}
                animate={{
                    y: [10, -10, 10],
                    rotate: [-10, -20, -10]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}
