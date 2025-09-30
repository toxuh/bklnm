"use client";

import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import HeroSection from "../components/sections/hero-section";
import AlbumSection from "../components/sections/album-section";
// import SocialSection from "../components/sections/social-section";
import MouseEffects from "../components/ui/mouse-effects";
import BackgroundEffects from "../components/ui/background-effects";
import SoundEffects from "../components/ui/sound-effects";
import LoadingScreen from "../components/ui/loading-screen";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useMedia("(max-width: 768px)");
  const isTablet = useMedia("(max-width: 1024px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-2xl font-mono neon-glow-blue">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  // Adjust effects intensity based on device
  const getIntensity = () => {
    if (isMobile) return "low";
    if (isTablet) return "medium";
    return "high";
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects
        intensity={getIntensity()}
        showGrid={true}
        showParticles={!isMobile}
        showScanlines={true}
        showMatrixRain={false} // Disabled for performance
      />

      {/* Mouse Effects - Desktop only */}
      {!isMobile && (
        <MouseEffects
          trailCount={isMobile ? 5 : isTablet ? 8 : 12}
          intensity={getIntensity()}
          colors={[
            "var(--neon-pink)",
            "var(--neon-blue)",
            "var(--neon-green)",
            "var(--neon-purple)",
          ]}
        />
      )}

      {/* Sound Effects */}
      <SoundEffects
        enabled={!isMobile} // Disabled on mobile for better UX
        volume={0.2}
      />

      {/* Main Content */}
      <HeroSection className="relative z-10" />

      {/* Album Release Section */}
      <AlbumSection className="relative z-10" />

      {/* Social Section - Temporarily hidden */}
      {/* <SocialSection className="relative z-10" /> */}

      {/* Mobile-specific touch indicator */}
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="text-xs font-mono neon-glow-green opacity-60 text-center">
            TAP TO INTERACT
          </div>
        </div>
      )}
    </main>
  );
}
