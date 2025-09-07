"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  color?: "pink" | "blue" | "green" | "purple";
  variant?: "border" | "glow" | "pulse" | "scan";
  intensity?: "low" | "medium" | "high";
  animated?: boolean;
}

const NeonContainer = ({
  children,
  className = "",
  color = "pink",
  variant = "border",
  intensity = "medium",
  animated = true,
}: Readonly<Props>) => {
  const colors = {
    pink: "var(--neon-pink)",
    blue: "var(--neon-blue)",
    green: "var(--neon-green)",
    purple: "var(--neon-purple)",
  };

  const intensityValues = {
    low: { blur: 5, spread: 5, opacity: 0.6 },
    medium: { blur: 10, spread: 10, opacity: 0.8 },
    high: { blur: 20, spread: 15, opacity: 1 },
  };

  const selectedColor = colors[color];
  const { blur, opacity } = intensityValues[intensity];

  const getBoxShadow = () => {
    switch (variant) {
      case "glow":
        return `
          0 0 ${blur}px ${selectedColor},
          0 0 ${blur * 2}px ${selectedColor},
          0 0 ${blur * 3}px ${selectedColor}
        `;
      case "border":
        return `
          0 0 ${blur}px ${selectedColor},
          inset 0 0 ${blur}px ${selectedColor}
        `;
      case "pulse":
        return `
          0 0 ${blur}px ${selectedColor},
          0 0 ${blur * 2}px ${selectedColor},
          inset 0 0 ${blur}px ${selectedColor}
        `;
      case "scan":
        return `
          0 0 ${blur}px ${selectedColor},
          0 0 ${blur * 2}px ${selectedColor}
        `;
      default:
        return `0 0 ${blur}px ${selectedColor}`;
    }
  };

  const getBorder = () => {
    if (variant === "glow") return "none";
    return `2px solid ${selectedColor}`;
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [opacity, opacity * 0.7, opacity],
    boxShadow: [
      getBoxShadow(),
      `0 0 ${blur * 2}px ${selectedColor}, 0 0 ${blur * 4}px ${selectedColor}`,
      getBoxShadow(),
    ],
  };

  const scanAnimation = {
    backgroundPosition: ["0% 0%", "100% 100%"],
  };

  const scanTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const,
  };

  const getAnimation = () => {
    if (!animated) return {};

    switch (variant) {
      case "pulse":
        return {
          animate: pulseAnimation,
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const,
          },
        };
      case "scan":
        return {
          animate: scanAnimation,
          transition: scanTransition,
        };
      default:
        return {};
    }
  };

  const containerStyle = {
    border: getBorder(),
    boxShadow: getBoxShadow(),
    opacity,
    ...(variant === "scan" && {
      background: `
        linear-gradient(
          45deg,
          transparent 30%,
          ${selectedColor}22 50%,
          transparent 70%
        )
      `,
      backgroundSize: "200% 200%",
    }),
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={containerStyle}
      {...getAnimation()}
    >
      {children}

      {/* Additional scan line effect */}
      {variant === "scan" && animated && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute w-full h-0.5 opacity-80"
            style={{
              background: `linear-gradient(90deg, transparent, ${selectedColor}, transparent)`,
              boxShadow: `0 0 10px ${selectedColor}`,
            }}
            animate={{
              top: ["-2px", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default NeonContainer;
