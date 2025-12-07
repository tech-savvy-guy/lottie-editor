'use client'

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import Footer from '@/components/footer';
import FileDrop from '@/components/file-drop';
import PreviewArea from '@/components/preview-area';

import { useAnimationStore } from '@/store/animation';

export default function Home() {
  const animationData = useAnimationStore((state) => state.animationData);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const backgroundGradient = isDark
    ? "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)"
    : "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #e0f2fe 100%)";

  return (
    <div className="min-h-screen w-full relative bg-background flex flex-col">
      {/* Dark Horizon Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: backgroundGradient,
        }}
      />
      
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="max-w-3xl w-full px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium tracking-tight text-foreground mb-3">
              Lottie Converter
            </h1>
            <p className="text-muted-foreground text-sm">
              Convert and preview Lottie animations
            </p>
          </div>
          
          {!animationData && <FileDrop />}
          {animationData && <PreviewArea />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

