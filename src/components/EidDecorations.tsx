import { motion } from "framer-motion";

const Lantern = ({ delay = 0, x, scale = 1, color = "#FFD700" }: { delay?: number; x: string; scale?: number; color?: string }) => (
    <motion.div
        initial={{ rotate: -5 }}
        animate={{ rotate: 5 }}
        transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: delay,
        }}
        className="fixed top-0 z-[100] pointer-events-none origin-top"
        style={{ left: x, scale }}
    >
        {/* String */}
        <div className="w-0.5 h-16 bg-gradient-to-b from-transparent to-primary/50 mx-auto" />

        {/* Lantern Body */}
        <div className="relative">
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L35 15L30 45L20 55L10 45L5 15L20 0Z" fill={color} fillOpacity="0.8" stroke="#B8860B" strokeWidth="2" />
                <path d="M20 55L20 60" stroke="#B8860B" strokeWidth="2" />
                <circle cx="20" cy="30" r="5" fill="#FFF" fillOpacity="0.6" className="animate-pulse" />
            </svg>
        </div>
    </motion.div>
);

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const AnimatedCrescent = () => {
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Start the loop
        const showTimer = setTimeout(() => setIsVisible(true), 1000); // Initial delay
        return () => clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isVisible) {
            // Stay visible for 3 seconds, then hide
            // Total cycle: Enter (2s) + Hold (3s) -> Hide
            // Note: Framer motion duration is set in variants, but we need to coordinate the state switch.
            timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000); // 2s enter + 3s hold = 5s
        } else {
            // Wait for hide anim (2s) + Hold (3s) -> Show
            timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000); // 2s exit + 3s hold = 5s
        }

        return () => clearTimeout(timer);
    }, [isVisible]);

    return (
        <div className="fixed top-24 right-0 z-[50] flex flex-row-reverse items-center pointer-events-none pr-4">
            {/* Text Mask Container - Animates Width */}
            {/* overflow-hidden ensures text is masked. justify-end keeps text pinned to the right side of the mask. */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isVisible ? "auto" : 0, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="overflow-hidden flex justify-end items-center"
            >
                {/* Inner Text - No Background */}
                <div className={`whitespace-nowrap px-4 ml-[-10px] mr-2
                    ${language === 'ar' ? 'font-arabic text-xl pt-1' : 'text-lg font-serif'}`}
                    style={{ direction: 'rtl' }}
                >
                    <span className="text-[#FFD700] font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] text-2xl">
                        {language === 'ar' ? "عيد مبارك" : "Eid Mubarak"}
                    </span>
                </div>
            </motion.div>

            {/* Crescent - The "Duster" */}
            {/* It sits in the flex flow. As the sibling grows, this gets pushed left. */}
            <div className="relative z-10 w-[80px] h-[80px]">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">
                    {/* Wiggling Star/Moon Body */}
                    <motion.g
                        animate={{ rotate: [0, -5, 0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ originX: "50px", originY: "50px" }}
                    >
                        <path d="M85 50C85 69.33 69.33 85 50 85C34.5 85 21.5 75 17 61C22 64 28 66 34 66C56.09 66 74 48.09 74 26C74 19 72 13 69 8C80 14 85 30 85 50Z" fill="#FFD700" />
                    </motion.g>
                </svg>

                {/* Hanging Lantern/Star - Independent Swing */}
                <motion.div
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[35px] top-[65px] origin-top"
                >
                    <div className="w-[1px] h-8 bg-[#B8860B] mx-auto" />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" className="-mt-1">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};

// Stars background effect
const Stars = () => {
    // Generate random stars
    const stars = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        top: Math.random() * 50 + "%",
        left: Math.random() * 100 + "%",
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full opacity-40"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: star.delay }}
                />
            ))}
        </div>
    );
};

const BackgroundPattern = () => (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
    />
);

const EidDecorations = () => {
    return (
        <>
            <BackgroundPattern />

            <Stars />

            {/* Lanterns - varying positions and delays */}
            <Lantern x="5%" delay={0} scale={0.8} color="#D4AF37" />
            <Lantern x="15%" delay={0.5} scale={1} color="#C0C0C0" />
            <Lantern x="85%" delay={0.2} scale={0.9} color="#D4AF37" />
            <Lantern x="92%" delay={0.7} scale={0.7} color="#C0C0C0" />

            <AnimatedCrescent />

            {/* Decorative gradient overlay at the top */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-10" />
        </>
    );
};

export default EidDecorations;
