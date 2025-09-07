"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  trailCount?: number;
  colors?: string[];
  intensity?: "low" | "medium" | "high";
}

const MouseEffects = ({
  trailCount = 10,
  colors = [
    "var(--neon-pink)",
    "var(--neon-blue)",
    "var(--neon-green)",
    "var(--neon-purple)",
  ],
  intensity = "medium",
}: Readonly<Props>) => {
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const intensitySettings = {
    low: { size: 8, blur: 5, opacity: 0.6 },
    medium: { size: 12, blur: 10, opacity: 0.8 },
    high: { size: 16, blur: 15, opacity: 1 },
  };

  const settings = intensitySettings[intensity];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      setMousePosition({ x, y });
      cursorX.set(x);
      cursorY.set(y);

      // Update trail
      setTrail((prev) => {
        const newTrail = [
          { x, y, id: Date.now() + Math.random() },
          ...prev.slice(0, trailCount - 1),
        ];
        return newTrail;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, trailCount]);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"]',
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Mouse position is tracked via event listeners

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-mode-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: -settings.size / 2,
          y: -settings.size / 2,
        }}
      >
        <motion.div
          className="rounded-full border-2"
          style={{
            width: settings.size,
            height: settings.size,
            borderColor: colors[0],
            boxShadow: `0 0 ${settings.blur}px ${colors[0]}`,
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? colors[1] : colors[0],
            boxShadow: isHovering
              ? `0 0 ${settings.blur * 2}px ${colors[1]}`
              : `0 0 ${settings.blur}px ${colors[0]}`,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-1 rounded-full"
            style={{
              backgroundColor: colors[0],
              opacity: settings.opacity * 0.5,
            }}
            animate={{
              backgroundColor: isHovering ? colors[1] : colors[0],
              scale: isHovering ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.div>

      {/* Trail Effect */}
      {trail.map((point, index) => {
        const delay = index * 0.02;
        const scale = 1 - (index / trailCount) * 0.8;
        const opacity = settings.opacity * (1 - index / trailCount) * 0.7;
        const colorIndex = index % colors.length;

        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-40 rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: settings.size * scale,
              height: settings.size * scale,
              x: -(settings.size * scale) / 2,
              y: -(settings.size * scale) / 2,
              backgroundColor: colors[colorIndex],
              boxShadow: `0 0 ${settings.blur * scale}px ${colors[colorIndex]}`,
              opacity,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              delay,
              duration: 0.3,
              ease: [0.6, -0.05, 0.01, 0.99] as const,
            }}
          />
        );
      })}

      {/* Particle Burst on Click */}
      <ClickParticles colors={colors} intensity={intensity} />
    </>
  );
};

const ClickParticles = ({
  colors,
  intensity,
}: {
  colors: string[];
  intensity: string;
}) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      color: string;
      angle: number;
      speed: number;
    }>
  >([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const particleCount =
        intensity === "high" ? 12 : intensity === "medium" ? 8 : 4;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        color: colors[i % colors.length],
        angle: (360 / particleCount) * i,
        speed: 50 + Math.random() * 50,
      }));

      setParticles((prev) => [...prev, ...newParticles]);

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
      }, 1000);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [colors, intensity]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-30 w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}`,
          }}
          initial={{
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
          }}
          animate={{
            scale: 0,
            opacity: 0,
            x: Math.cos((particle.angle * Math.PI) / 180) * particle.speed,
            y: Math.sin((particle.angle * Math.PI) / 180) * particle.speed,
          }}
          transition={{
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99] as const,
          }}
        />
      ))}
    </>
  );
};

export default MouseEffects;
