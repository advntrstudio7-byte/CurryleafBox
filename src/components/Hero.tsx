import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sizzleSnd from '../assets/sizzle.wav';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Dynamically import all zero-padded frame images from the banner folder
const modulesDesktop = import.meta.glob('../assets/banner/frame_*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const modulesMobile = import.meta.glob('../assets/banner_mob/Mob_01_*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

// ─── All frame sources in order ───────────────────────────────────────────────
const FRAME_SRCS_DESKTOP = Object.keys(modulesDesktop).sort().map(key => modulesDesktop[key]);
const FRAME_SRCS_MOBILE = Object.keys(modulesMobile).sort().map(key => modulesMobile[key]);

// ─── Native dimensions ──────────────────────────────────────────────────────────
const DESKTOP_W = 2212;
const DESKTOP_H = 1133;
const MOBILE_W = 1080;
const MOBILE_H = 1605;

interface HeroProps {
  onViewMenuClick: () => void;
}

export default function Hero({ onViewMenuClick }: HeroProps) {
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const scrollRef       = useRef<HTMLDivElement>(null);
  const imagesRef       = useRef<HTMLImageElement[]>([]);
  const audioRef        = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const rafId           = useRef<number | null>(null);
  const hasPlayed       = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const frameSrcs = isMobile ? FRAME_SRCS_MOBILE : FRAME_SRCS_DESKTOP;
  const imgW = isMobile ? MOBILE_W : DESKTOP_W;
  const imgH = isMobile ? MOBILE_H : DESKTOP_H;

  // Reset scroll on refresh so video starts from the beginning
  useEffect(() => {
    if (window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // ── 1. Preload ALL frames into memory before any scroll can happen ────────────
  useEffect(() => {
    let loaded = 0;
    setReady(false);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }

    const imgs = frameSrcs.map((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        // Draw frame-0 the moment it arrives so there's no blank flash
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          ctx?.drawImage(img, 0, 0, imgW, imgH);
          setReady(true);
        }
      };
      return img;
    });

    imagesRef.current = imgs;
  }, [frameSrcs, imgW, imgH]);

  // ── 2. Bind the timeline to GSAP ScrollTrigger ─────────
  useEffect(() => {
    if (!ready || !scrollRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const airfoils = { frame: 0 };

    // Function to render a specific frame onto the canvas using requestAnimationFrame
    const renderFrame = (index: number) => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(() => {
        const img = imagesRef.current[index];
        if (img && img.complete) {
          ctx.clearRect(0, 0, imgW, imgH);
          ctx.drawImage(img, 0, 0, imgW, imgH);
        }
      });
    };

    // Main animation timeline tied directly to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });
    
    let maxFrameRendered = 0;

    tl.to(airfoils, {
      frame: frameSrcs.length - 1,
      ease: 'none',
      onUpdate: () => {
        const currentFrame = Math.round(airfoils.frame);
        
        // Only progress the frame forward
        if (currentFrame > maxFrameRendered) {
          maxFrameRendered = currentFrame;
          renderFrame(maxFrameRendered);
          
          // Trigger the realistic sizzle sound when the leaf drops onto the board (around frame 20)
          if (maxFrameRendered >= 20 && !hasPlayed.current) {
            if (audioRef.current) {
              if (audioRef.current.paused) {
                audioRef.current.currentTime = 0;
              }
              const playPromise = audioRef.current.play();
              if (playPromise !== undefined) {
                playPromise.then(() => {
                  hasPlayed.current = true;
                }).catch(() => {
                  // Playback was blocked by autoplay policy.
                  // We do not set hasPlayed.current to true, so it will retry on the next scroll tick.
                });
              } else {
                hasPlayed.current = true;
              }
            }
          }
        }
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [ready]);

  return (
    /*
     * Tall container drives scroll progress.
     */
    <div
      ref={scrollRef}
      style={{ height: '220vh' }}
      className="relative w-full"
    >
      {/* ── Sticky panel: height locks to aspect ratio ── */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: `calc(100vw * ${imgH} / ${imgW})` }}
      >
        {/* ── Canvas: rendered to by GSAP ScrollTrigger ── */}
        <canvas
          ref={canvasRef}
          width={imgW}
          height={imgH}
          className="block w-full h-auto"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s' }}
        />

        {/* ── Text overlay ── */}
        <div className={`absolute inset-0 z-10 flex ${isMobile ? 'flex-col justify-end pb-[12vh] items-center' : 'items-center px-6 md:px-16'} max-w-[1440px] mx-auto w-full pointer-events-none`}>
          <div
            className={`flex flex-col gap-5 md:gap-6 pointer-events-auto ${isMobile ? 'items-center text-center w-[90%]' : ''}`}
            style={{ maxWidth: isMobile ? '100%' : '38%' }}
          >

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`font-serif text-white font-bold tracking-tight ${isMobile ? 'text-4xl leading-[1.15]' : 'text-3xl md:text-5xl lg:text-6xl leading-[1.1]'}`}
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.75), 0 1px 6px rgba(0,0,0,0.9)' }}
            >
              Authentic South {isMobile ? '' : <br />}
              <span className="text-amber-200">Indian Heritage.</span> <br />
              <span className="text-amber-400">Delivered.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className={`font-sans text-white/90 leading-relaxed ${isMobile ? 'text-sm px-2' : 'text-xs md:text-sm'}`}
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
            >
              Experience Keralan flavors, ancient recipes, and home-style
              grinding techniques, crafted by master chefs and brought
              directly to your table.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={onViewMenuClick}
                className="px-6 py-3 bg-white text-[#3d2010] rounded-full font-caps text-xs md:text-sm tracking-widest uppercase shadow-lg hover:bg-amber-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer font-bold"
              >
                <Utensils className="w-4 h-4" />
                View Menu
              </button>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className="w-1 h-1 bg-amber-300 rounded-full"
                />
              </div>
              <span className="font-caps text-[10px] tracking-widest text-white/50 uppercase">
                Scroll to explore
              </span>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ── Native Audio Element for reliable playback ── */}
      <audio ref={audioRef} src={sizzleSnd} preload="auto" />
    </div>
  );
}
