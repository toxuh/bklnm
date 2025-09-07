"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "./glitch-text";

const LOADING_TEXTS = [
  "INITIALIZING...",
  "LOADING BADASS MODE...",
  "ACTIVATING NEON SYSTEMS...",
  "PREPARING GLITCH EFFECTS...",
  "SYNCING CYBERPUNK VIBES...",
  "READY TO ROCK!",
];

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Readonly<Props>) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("INITIALIZING...");
  const [showGlitch, setShowGlitch] = useState(false);



  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;

        // Update text based on progress
        const textIndex = Math.floor(
          (newProgress / 100) * (LOADING_TEXTS.length - 1),
        );
        setCurrentText(
          LOADING_TEXTS[Math.min(textIndex, LOADING_TEXTS.length - 1)],
        );

        // Trigger glitch effects randomly
        if (Math.random() < 0.3) {
          setShowGlitch(true);
          setTimeout(() => setShowGlitch(false), 200);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(var(--neon-blue) 1px, transparent 1px),
                linear-gradient(90deg, var(--neon-blue) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "40px 40px"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Scanlines */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5"
              style={{
                background: `linear-gradient(90deg, transparent, var(--neon-pink), transparent)`,
                boxShadow: "0 0 10px var(--neon-pink)",
                opacity: 0.6,
              }}
              animate={{
                top: ["-2px", "100vh"],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <motion.div
            className="mb-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] as const }}
          >
            <GlitchText
              className="text-6xl md:text-8xl font-bold"
              intensity="high"
              speed="fast"
              colors={[
                "var(--neon-pink)",
                "var(--neon-blue)",
                "var(--neon-green)",
              ]}
            >
              BKLNM
            </GlitchText>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="mb-8"
            animate={
              showGlitch
                ? {
                    x: [-2, 2, -1, 1, 0],
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(90deg)",
                      "hue-rotate(0deg)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.2 }}
          >
            <div className="text-xl md:text-2xl font-mono neon-glow-blue">
              {currentText}
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-80 md:w-96 mx-auto">
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden neon-border-pink">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, var(--neon-pink), var(--neon-blue), var(--neon-green))`,
                  boxShadow: "0 0 20px var(--neon-pink)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] as const }}
              />

              {/* Glitch overlay on progress bar */}
              {showGlitch && (
                <motion.div
                  className="absolute inset-0 bg-white opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </div>

            {/* Progress Text */}
            <div className="text-center mt-4 font-mono text-sm neon-glow-green">
              {Math.round(progress)}%
            </div>
          </div>

          {/* System Messages */}
          <motion.div
            className="mt-8 space-y-2 font-mono text-xs opacity-60"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1] as const,
            }}
          >
            <div className="neon-glow-purple">{">"} SYSTEM STATUS: ONLINE</div>
            <div className="neon-glow-green">{">"} CYBERPUNK MODE: ACTIVE</div>
            <div className="neon-glow-blue">{">"} BADASS LEVEL: MAXIMUM</div>
          </motion.div>
        </div>

        {/* Corner Elements */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 ${
              i === 0
                ? "top-4 left-4 border-l-2 border-t-2"
                : i === 1
                  ? "top-4 right-4 border-r-2 border-t-2"
                  : i === 2
                    ? "bottom-4 left-4 border-l-2 border-b-2"
                    : "bottom-4 right-4 border-r-2 border-b-2"
            }`}
            style={{
              borderColor: [
                "var(--neon-pink)",
                "var(--neon-blue)",
                "var(--neon-green)",
                "var(--neon-purple)",
              ][i],
              boxShadow: `0 0 10px ${["var(--neon-pink)", "var(--neon-blue)", "var(--neon-green)", "var(--neon-purple)"][i]}`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1] as const,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
