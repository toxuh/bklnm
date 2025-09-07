"use client";

import { motion } from "framer-motion";
import GlitchText from "../ui/glitch-text";
import NeonContainer from "../ui/neon-container";

interface Props {
  className?: string;
}

const SocialSection = ({ className = "" }: Readonly<Props>) => {
  const socialLinks = [
    { name: "INSTAGRAM", url: "#", color: "pink" as const },
    { name: "TIKTOK", url: "#", color: "blue" as const },
    { name: "YOUTUBE", url: "#", color: "green" as const },
    { name: "SPOTIFY", url: "#", color: "purple" as const },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <motion.section
      className={`min-h-screen flex flex-col items-center justify-center relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Coming Soon Text */}
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <GlitchText
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          intensity="high"
          speed="normal"
          colors={["var(--neon-green)", "var(--neon-pink)", "var(--neon-blue)"]}
        >
          COMING SOON
        </GlitchText>

        <motion.div
          className="text-lg md:text-xl font-mono opacity-80"
          variants={itemVariants}
        >
          <span className="neon-glow-blue">PREPARE FOR THE INVASION</span>
        </motion.div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
        variants={itemVariants}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            className="block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => {
              if ((window as unknown as { playHoverSound?: () => void }).playHoverSound) {
                (window as unknown as { playHoverSound: () => void }).playHoverSound();
              }
            }}
            onClick={() => {
              if ((window as unknown as { playClickSound?: () => void }).playClickSound) {
                (window as unknown as { playClickSound: () => void }).playClickSound();
              }
            }}
          >
            <NeonContainer
              color={social.color}
              variant="pulse"
              intensity="medium"
              className="p-4 md:p-6 text-center"
            >
              <motion.div
                className="font-mono font-bold text-sm md:text-base"
                animate={{
                  textShadow: [
                    `0 0 5px var(--neon-${social.color})`,
                    `0 0 20px var(--neon-${social.color})`,
                    `0 0 5px var(--neon-${social.color})`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1] as const,
                  delay: index * 0.5,
                }}
              >
                {social.name}
              </motion.div>
            </NeonContainer>
          </motion.a>
        ))}
      </motion.div>

      {/* Glitch Message */}
      <motion.div className="text-center" variants={itemVariants}>
        <motion.div
          className="font-mono text-xs md:text-sm opacity-60"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const,
          }}
        >
          <span className="neon-glow-purple">
            {">"} SYSTEM_STATUS: LOADING...
          </span>
        </motion.div>

        <motion.div
          className="font-mono text-xs md:text-sm opacity-40 mt-2"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const,
            delay: 1,
          }}
        >
          <span className="neon-glow-green">{">"} BADASS_MODE: ACTIVATED</span>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "var(--neon-pink)" : "var(--neon-blue)",
              boxShadow: `0 0 10px ${i % 2 === 0 ? "var(--neon-pink)" : "var(--neon-blue)"}`,
              left: `${10 + i * 10}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1] as const,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default SocialSection;
