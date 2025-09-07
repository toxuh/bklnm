"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  speed?: "slow" | "normal" | "fast";
  colors?: string[];
  defaultColor?: string;
}

const GlitchText = ({
  children,
  className = "",
  intensity = "medium",
  speed = "normal",
  colors = ["var(--neon-pink)", "var(--neon-blue)", "var(--neon-green)"],
  defaultColor = "var(--neon-pink)",
}: Readonly<Props>) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentText, setCurrentText] = useState(children);

  const intensitySettings = {
    low: { maxOffset: 2, glitchChance: 0.1 },
    medium: { maxOffset: 4, glitchChance: 0.2 },
    high: { maxOffset: 8, glitchChance: 0.3 },
  };

  const speedSettings = {
    slow: 200,
    normal: 100,
    fast: 50,
  };

  const settings = intensitySettings[intensity];
  const intervalSpeed = speedSettings[speed];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < settings.glitchChance) {
        setGlitchActive(true);

        // Randomly corrupt some characters
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`";
        const corruptedText = children
          .split("")
          .map((char) => {
            if (Math.random() < 0.1 && char !== " ") {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
          })
          .join("");

        setCurrentText(corruptedText);

        setTimeout(
          () => {
            setGlitchActive(false);
            setCurrentText(children);
          },
          50 + Math.random() * 100,
        );
      }
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [children, settings.glitchChance, intervalSpeed]);

  const glitchVariants = {
    normal: {
      transform: "translate(0px, 0px)",
      filter: "hue-rotate(0deg)",
      // No text shadow for clean, readable text
      textShadow: "none",
    },
    glitch: {
      // Use transform instead of x/y to prevent layout shifts
      transform: [
        `translate(${-settings.maxOffset}px, ${-settings.maxOffset}px)`,
        `translate(${settings.maxOffset}px, ${settings.maxOffset}px)`,
        `translate(${-settings.maxOffset}px, ${-settings.maxOffset}px)`,
        `translate(0px, 0px)`,
      ],
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(90deg)",
        "hue-rotate(180deg)",
        "hue-rotate(0deg)",
      ],
      textShadow: [
        `0 0 5px ${colors[0]}, 0 0 10px ${colors[0]}`,
        `0 0 5px ${colors[1]}, 0 0 10px ${colors[1]}`,
        `0 0 5px ${colors[2]}, 0 0 10px ${colors[2]}`,
        `0 0 5px ${colors[0]}, 0 0 10px ${colors[0]}`,
      ],
      transition: {
        duration: 0.1,
        times: [0, 0.3, 0.6, 1],
      },
    },
  };

  return (
    <div className={`relative inline-block ${className}`} style={{
      minWidth: 'fit-content',
      // Prevent layout shifts during glitch
      contain: 'layout'
    }}>
      {/* Background layers - only show during glitch */}
      {glitchActive && (
        <>
          <motion.span
            className="absolute inset-0 opacity-70"
            style={{
              color: colors[1],
              transform: "translate(-1px, -1px)",
              zIndex: -2,
            }}
            animate="glitch"
            variants={glitchVariants}
          >
            {currentText}
          </motion.span>

          <motion.span
            className="absolute inset-0 opacity-70"
            style={{
              color: colors[2],
              transform: "translate(1px, 1px)",
              zIndex: -1,
            }}
            animate="glitch"
            variants={glitchVariants}
          >
            {currentText}
          </motion.span>
        </>
      )}

      {/* Main text */}
      <motion.span
        className="relative z-10"
        style={{
          color: glitchActive ? colors[0] : defaultColor,
          fontWeight: 900,
          letterSpacing: '0.1em'
        }}
        animate={glitchActive ? "glitch" : "normal"}
        variants={glitchVariants}
      >
        {currentText}
      </motion.span>

      {/* Scanline overlay */}
      {glitchActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.1 }}
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${colors[0]}22 2px,
              ${colors[0]}22 4px
            )`,
          }}
        />
      )}
    </div>
  );
};

export default GlitchText;
