"use client";

import { useEffect, useRef } from "react";

interface Props {
  enabled?: boolean;
  volume?: number;
}

const SoundEffects = ({ enabled = true, volume = 0.3 }: Readonly<Props>) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Initialize Web Audio API
    const initAudio = () => {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.value = volume;
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [enabled, volume]);

  const playGlitchSound = (frequency = 800, duration = 100) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    oscillator.connect(envelope);
    envelope.connect(gainNodeRef.current);

    // Create glitch-like sound
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(
      frequency,
      audioContextRef.current.currentTime,
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 0.5,
      audioContextRef.current.currentTime + duration / 1000,
    );

    // Envelope
    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    envelope.gain.linearRampToValueAtTime(
      0.1,
      audioContextRef.current.currentTime + 0.01,
    );
    envelope.gain.exponentialRampToValueAtTime(
      0.001,
      audioContextRef.current.currentTime + duration / 1000,
    );

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  const playClickSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(envelope);
    envelope.connect(gainNodeRef.current);

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(
      1200,
      audioContextRef.current.currentTime,
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      400,
      audioContextRef.current.currentTime + 0.1,
    );

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2000, audioContextRef.current.currentTime);

    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    envelope.gain.linearRampToValueAtTime(
      0.05,
      audioContextRef.current.currentTime + 0.01,
    );
    envelope.gain.exponentialRampToValueAtTime(
      0.001,
      audioContextRef.current.currentTime + 0.1,
    );

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const playHoverSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    oscillator.connect(envelope);
    envelope.connect(gainNodeRef.current);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
      600,
      audioContextRef.current.currentTime,
    );
    oscillator.frequency.linearRampToValueAtTime(
      800,
      audioContextRef.current.currentTime + 0.05,
    );

    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    envelope.gain.linearRampToValueAtTime(
      0.02,
      audioContextRef.current.currentTime + 0.01,
    );
    envelope.gain.exponentialRampToValueAtTime(
      0.001,
      audioContextRef.current.currentTime + 0.05,
    );

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.05);
  };

  useEffect(() => {
    if (!enabled) return;

    // Add event listeners for interactions
    const handleClick = () => playClickSound();
    const handleMouseEnter = () => playHoverSound();

    // Random glitch sounds
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        playGlitchSound(400 + Math.random() * 800, 50 + Math.random() * 100);
      }
    }, 3000);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"]',
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("click", handleClick);
      el.addEventListener("mouseenter", handleMouseEnter);
    });

    // Global click listener
    document.addEventListener("click", handleClick);

    return () => {
      clearInterval(glitchInterval);
      interactiveElements.forEach((el) => {
        el.removeEventListener("click", handleClick);
        el.removeEventListener("mouseenter", handleMouseEnter);
      });
      document.removeEventListener("click", handleClick);
    };
  }, [enabled]);

  // Expose sound functions globally for other components
  useEffect(() => {
    if (!enabled) return;

    (window as unknown as { playGlitchSound: typeof playGlitchSound }).playGlitchSound = playGlitchSound;
    (window as unknown as { playClickSound: typeof playClickSound }).playClickSound = playClickSound;
    (window as unknown as { playHoverSound: typeof playHoverSound }).playHoverSound = playHoverSound;

    return () => {
      delete (window as unknown as { playGlitchSound?: typeof playGlitchSound }).playGlitchSound;
      delete (window as unknown as { playClickSound?: typeof playClickSound }).playClickSound;
      delete (window as unknown as { playHoverSound?: typeof playHoverSound }).playHoverSound;
    };
  }, [enabled]);

  return null; // This component doesn't render anything
};

export default SoundEffects;
