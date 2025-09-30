"use client";

import { useEffect, useState } from "react";
import { motion, easeInOut, easeOut } from "framer-motion";
import Image from "next/image";
import GlitchText from "../ui/glitch-text";
import NeonContainer from "../ui/neon-container";

interface Props {
  className?: string;
}

const AlbumSection = ({ className = "" }: Readonly<Props>) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glassShards, setGlassShards] = useState<
    Array<{ id: number; x: number; y: number; rotation: number; delay: number }>
  >([]);

  useEffect(() => {
    const shards = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
    }));
    setGlassShards(shards);
  }, []);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
  };

  const albumVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: easeInOut,
      },
    },
  };

  const shardVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: [0, 0.8, 0.6],
      scale: [0, 1.2, 1],
      transition: {
        duration: 0.8,
        delay: custom,
        ease: easeOut,
      },
    }),
  };

  return (
    <motion.section
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px opacity-20"
            style={{
              top: `${i * 12.5}%`,
              left: 0,
              right: 0,
              background: `linear-gradient(90deg, transparent, var(--neon-${["pink", "blue", "green", "purple"][i % 4]}), transparent)`,
              transform: `skewY(-${5 + i * 2}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              x: [-100, 100],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `var(--neon-${["pink", "blue", "green", "purple"][i % 4]})`,
              boxShadow: `0 0 10px var(--neon-${["pink", "blue", "green", "purple"][i % 4]})`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 px-6 max-w-7xl mx-auto">
        <motion.div
          className="relative order-1 lg:order-1"
          variants={albumVariants}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <NeonContainer
            color="purple"
            variant="pulse"
            intensity="high"
            className="p-2 rounded-lg overflow-visible"
          >
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] overflow-hidden rounded-lg"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/cover-small.jpg"
                alt="BKLNM Album Cover"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 pointer-events-none">
                {glassShards.map((shard) => (
                  <motion.div
                    key={shard.id}
                    className="absolute"
                    style={{
                      left: `${shard.x}%`,
                      top: `${shard.y}%`,
                      width: "60px",
                      height: "60px",
                      transform: `rotate(${shard.rotation}deg)`,
                    }}
                    variants={shardVariants}
                    custom={shard.delay}
                    animate={
                      isHovered
                        ? {
                            x: (shard.x - 50) * 0.5,
                            y: (shard.y - 50) * 0.5,
                            rotate: shard.rotation + 45,
                          }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(${shard.rotation}deg, 
                          transparent 30%, 
                          rgba(255, 255, 255, 0.1) 50%, 
                          transparent 70%)`,
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                        border: "1px solid rgba(0, 255, 255, 0.3)",
                        boxShadow: `0 0 10px rgba(0, 255, 255, 0.2)`,
                      }}
                    />
                  </motion.div>
                ))}

                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ mixBlendMode: "screen" }}
                >
                  <motion.path
                    d="M 0,200 Q 100,150 200,200 T 400,200"
                    stroke="rgba(0, 255, 255, 0.4)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <motion.path
                    d="M 250,0 L 250,500"
                    stroke="rgba(255, 0, 128, 0.4)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                  <motion.path
                    d="M 100,100 L 400,400 M 400,100 L 100,400"
                    stroke="rgba(0, 255, 65, 0.3)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                  />
                </svg>
              </div>

              {isHovered && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      var(--neon-blue)22 2px,
                      var(--neon-blue)22 4px
                    )`,
                    mixBlendMode: "screen",
                  }}
                />
              )}
            </motion.div>
          </NeonContainer>

          <motion.div
            className="absolute -top-6 -right-6 z-20"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: easeInOut,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-neon-pink opacity-50" />
              <div className="relative px-6 py-3 bg-black border-2 border-neon-pink rounded-lg neon-glow-pink font-bold text-xl">
                NEW
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center lg:text-left order-2 lg:order-2 max-w-xl"
          variants={itemVariants}
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <GlitchText
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              intensity="high"
              speed="normal"
              colors={[
                "var(--neon-green)",
                "var(--neon-pink)",
                "var(--neon-blue)",
              ]}
            >
              NEW ALBUM
            </GlitchText>
            <GlitchText
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
              intensity="high"
              speed="normal"
              colors={[
                "var(--neon-pink)",
                "var(--neon-purple)",
                "var(--neon-blue)",
              ]}
            >
              THIS MONTH
            </GlitchText>
          </motion.div>

          <motion.p
            className="text-base md:text-lg font-mono opacity-70 mb-10 leading-relaxed"
            variants={itemVariants}
            style={{ color: "var(--neon-blue)" }}
          >
            Experience the chaos. Feel the glitch. Break through the glass into
            a new dimension of sound.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-neon-pink rounded-lg font-bold text-lg neon-glow-pink relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">STAY TUNED</span>
              <motion.div
                className="absolute inset-0 bg-neon-pink opacity-0 group-hover:opacity-20"
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-neon-blue rounded-lg font-bold text-lg neon-glow-blue relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">PRE-SAVE</span>
              <motion.div
                className="absolute inset-0 bg-neon-blue opacity-0 group-hover:opacity-20"
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: easeInOut,
        }}
      >
        <div className="text-xs font-mono neon-glow-green opacity-60">
          SCROLL FOR MORE
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AlbumSection;
