"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NEON_COLORS = [
  "var(--neon-pink)",
  "var(--neon-blue)",
  "var(--neon-green)",
  "var(--neon-purple)",
];

interface Props {
  intensity?: "low" | "medium" | "high";
  showGrid?: boolean;
  showParticles?: boolean;
  showScanlines?: boolean;
  showMatrixRain?: boolean;
}

const BackgroundEffects = ({
  intensity = "medium",
  showGrid = true,
  showParticles = true,
  showScanlines = true,
  showMatrixRain = false,
}: Readonly<Props>) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      direction: number;
    }>
  >([]);

  const [matrixChars, setMatrixChars] = useState<
    Array<{
      id: number;
      x: number;
      char: string;
      speed: number;
      color: string;
    }>
  >([]);

  const intensitySettings = {
    low: { particleCount: 20, matrixColumns: 10, opacity: 0.3 },
    medium: { particleCount: 40, matrixColumns: 20, opacity: 0.5 },
    high: { particleCount: 60, matrixColumns: 30, opacity: 0.7 },
  };

  const settings = intensitySettings[intensity];

  // Initialize floating particles
  useEffect(() => {
    if (!showParticles) return;

    const newParticles = Array.from(
      { length: settings.particleCount },
      (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 3,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
        speed: 0.5 + Math.random() * 2,
        direction: Math.random() * Math.PI * 2,
      }),
    );

    setParticles(newParticles);
  }, [showParticles, settings.particleCount]);

  // Initialize matrix rain
  useEffect(() => {
    if (!showMatrixRain) return;

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newMatrixChars = Array.from(
      { length: settings.matrixColumns },
      (_, i) => ({
        id: i,
        x: (window.innerWidth / settings.matrixColumns) * i,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: 1 + Math.random() * 3,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      }),
    );

    setMatrixChars(newMatrixChars);
  }, [showMatrixRain, settings.matrixColumns]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Animated Grid */}
      {showGrid && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--neon-blue)44 1px, transparent 1px),
              linear-gradient(90deg, var(--neon-blue)44 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: settings.opacity * 0.6,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Floating Particles */}
      {showParticles &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              opacity: settings.opacity,
            }}
            animate={{
              x: [
                particle.x,
                particle.x + Math.cos(particle.direction) * 200,
                particle.x + Math.cos(particle.direction + Math.PI) * 200,
                particle.x,
              ],
              y: [
                particle.y,
                particle.y + Math.sin(particle.direction) * 200,
                particle.y + Math.sin(particle.direction + Math.PI) * 200,
                particle.y,
              ],
              scale: [1, 1.5, 0.5, 1],
              opacity: [
                settings.opacity,
                settings.opacity * 0.3,
                settings.opacity * 0.8,
                settings.opacity,
              ],
            }}
            transition={{
              duration: 10 + particle.speed * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      {/* Matrix Rain Effect */}
      {showMatrixRain &&
        matrixChars.map((char) => (
          <motion.div
            key={char.id}
            className="absolute font-mono text-sm font-bold"
            style={{
              left: char.x,
              color: char.color,
              textShadow: `0 0 10px ${char.color}`,
              opacity: settings.opacity,
            }}
            animate={{
              y: [-50, window.innerHeight + 50],
            }}
            transition={{
              duration: 5 / char.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {char.char}
          </motion.div>
        ))}

      {/* Scanlines */}
      {showScanlines && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5"
              style={{
                background: `linear-gradient(90deg, transparent, ${NEON_COLORS[i % NEON_COLORS.length]}, transparent)`,
                boxShadow: `0 0 10px ${NEON_COLORS[i % NEON_COLORS.length]}`,
                opacity: settings.opacity * 0.8,
              }}
              animate={{
                top: ["-2px", "100vh"],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1,
              }}
            />
          ))}
        </>
      )}

      {/* Pulsing Corner Elements */}
      <div className="absolute top-4 left-4">
        <motion.div
          className="w-4 h-4 border-l-2 border-t-2"
          style={{
            borderColor: "var(--neon-pink)",
            boxShadow: "0 0 10px var(--neon-pink)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const,
          }}
        />
      </div>

      <div className="absolute top-4 right-4">
        <motion.div
          className="w-4 h-4 border-r-2 border-t-2"
          style={{
            borderColor: "var(--neon-blue)",
            boxShadow: "0 0 10px var(--neon-blue)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const,
            delay: 0.5,
          }}
        />
      </div>

      <div className="absolute bottom-4 left-4">
        <motion.div
          className="w-4 h-4 border-l-2 border-b-2"
          style={{
            borderColor: "var(--neon-green)",
            boxShadow: "0 0 10px var(--neon-green)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const,
            delay: 1,
          }}
        />
      </div>

      <div className="absolute bottom-4 right-4">
        <motion.div
          className="w-4 h-4 border-r-2 border-b-2"
          style={{
            borderColor: "var(--neon-purple)",
            boxShadow: "0 0 10px var(--neon-purple)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const,
            delay: 1.5,
          }}
        />
      </div>

      {/* Glitch Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              var(--neon-pink)11 100px,
              var(--neon-pink)11 102px
            )
          `,
          opacity: 0,
        }}
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 5 + Math.random() * 10,
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
