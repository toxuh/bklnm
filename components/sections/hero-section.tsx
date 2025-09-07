"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "../ui/glitch-text";
import NeonContainer from "../ui/neon-container";

interface Props {
  className?: string;
}

const HeroSection = ({ className = "" }: Readonly<Props>) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageGlitchActive, setImageGlitchActive] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const imageVariants = {
    normal: {
      scale: 1,
      filter: "brightness(1) contrast(1) saturate(1)",
      rotateX: 0,
      rotateY: 0,
    },
    glitch: {
      scale: [1, 1.02, 0.98, 1],
      filter: [
        "brightness(1) contrast(1) saturate(1)",
        "brightness(1.2) contrast(1.5) saturate(2)",
        "brightness(0.8) contrast(2) saturate(0.5)",
        "brightness(1) contrast(1) saturate(1)",
      ],
      rotateX: [-1, 1, -0.5, 0],
      rotateY: [-0.5, 0.5, -1, 0],
      transition: {
        duration: 0.2,
        times: [0, 0.3, 0.7, 1],
      },
    },
    hover: {
      scale: 1.05,
      filter: "brightness(1.1) contrast(1.2) saturate(1.3)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.section
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(var(--neon-blue) 1px, transparent 1px),
              linear-gradient(90deg, var(--neon-blue) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "float 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-6 max-w-7xl mx-auto">
        {/* Band Name */}
        <motion.div
          className="text-center lg:text-left order-2 lg:order-1 flex-shrink-0"
          variants={itemVariants}
        >
          <motion.div className="mb-6" style={{
            position: 'relative',
            width: 'fit-content',
            height: 'fit-content'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '10px'
            }}>
              <GlitchText
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider"
                intensity="medium"
                speed="normal"
                defaultColor="var(--neon-pink)"
                colors={[
                  "var(--neon-pink)",
                  "var(--neon-blue)",
                  "var(--neon-green)",
                ]}
              >
                BKLNM
              </GlitchText>
            </div>
            {/* Invisible placeholder to maintain layout */}
            <div className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider clean-title opacity-0 pointer-events-none">
              BKLNM
            </div>
          </motion.div>

          <motion.div
            className="text-xl md:text-2xl lg:text-3xl font-mono tracking-widest mb-8"
            variants={itemVariants}
            style={{
              position: 'relative',
              width: 'fit-content',
              height: 'fit-content'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '5px'
            }}>
              <GlitchText
                intensity="medium"
                speed="normal"
                defaultColor="var(--neon-blue)"
                colors={[
                  "var(--neon-blue)",
                  "var(--neon-purple)",
                  "var(--neon-pink)",
                ]}
              >
                COMING SOON
              </GlitchText>
            </div>
            {/* Invisible placeholder to maintain layout */}
            <div className="text-xl md:text-2xl lg:text-3xl font-mono tracking-widest clean-title-blue opacity-0 pointer-events-none">
              COMING SOON
            </div>
          </motion.div>


        </motion.div>

        {/* Band Photo */}
        <motion.div
          className="relative order-1 lg:order-2 flex-shrink-0"
          variants={itemVariants}
        >
          <NeonContainer
            color="pink"
            variant="scan"
            intensity="high"
            className="p-1 rounded-lg overflow-hidden"
          >
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] overflow-hidden rounded-lg"
              variants={imageVariants}
              animate={imageGlitchActive ? "glitch" : "normal"}
              whileHover="hover"
              onHoverStart={() => setImageGlitchActive(true)}
              onHoverEnd={() => setImageGlitchActive(false)}
            >
              <Image
                src="/bg.jpg"
                alt="BKLNM - K-pop duo"
                fill
                className="object-cover"
                onLoad={() => setImageLoaded(true)}
                priority
              />

              {/* Glitch overlay */}
              {imageGlitchActive && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        var(--neon-pink)33 2px,
                        var(--neon-pink)33 4px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        var(--neon-blue)33 2px,
                        var(--neon-blue)33 4px
                      )
                    `,
                    mixBlendMode: "screen",
                  }}
                />
              )}

              {/* RGB Split Effect */}
              {imageGlitchActive && (
                <>
                  <motion.div
                    className="absolute inset-0 opacity-70"
                    style={{
                      background: "var(--neon-pink)",
                      mixBlendMode: "multiply",
                      transform: "translateX(-2px)",
                    }}
                    animate={{
                      transform: [
                        "translateX(-2px)",
                        "translateX(2px)",
                        "translateX(-1px)",
                        "translateX(0px)",
                      ],
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  <motion.div
                    className="absolute inset-0 opacity-70"
                    style={{
                      background: "var(--neon-blue)",
                      mixBlendMode: "multiply",
                      transform: "translateX(2px)",
                    }}
                    animate={{
                      transform: [
                        "translateX(2px)",
                        "translateX(-2px)",
                        "translateX(1px)",
                        "translateX(0px)",
                      ],
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </>
              )}
            </motion.div>
          </NeonContainer>

          {/* Floating particles around image */}
          {imageLoaded && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background:
                      i % 2 === 0 ? "var(--neon-pink)" : "var(--neon-blue)",
                    boxShadow: `0 0 10px ${i % 2 === 0 ? "var(--neon-pink)" : "var(--neon-blue)"}`,
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 12}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1] as const,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="scanline" style={{ animationDelay: "0s" }} />
        <div className="scanline" style={{ animationDelay: "1s" }} />
        <div className="scanline" style={{ animationDelay: "2s" }} />
      </div>
    </motion.section>
  );
};

export default HeroSection;
