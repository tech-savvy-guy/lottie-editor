'use client'

import { useEffect, useRef } from 'react';
import { Lottie } from '@/store/animation';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationData: Lottie | null;
  onNewAnimation?: (anim: AnimationItem) => void;
}

export default function LottieAnimation({ animationData, onNewAnimation }: LottieAnimationProps) {
  const animContainerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!animContainerRef.current || !animationData) return;

    const animDataCopy = JSON.parse(JSON.stringify(animationData));
    const play = !animRef.current || !animRef.current.isPaused;
    const frame = animRef.current ? animRef.current.currentFrame : 0;

    animContainerRef.current.innerHTML = '';

    animRef.current = lottie.loadAnimation({
      container: animContainerRef.current,
      renderer: 'svg' as const,
      loop: true,
      autoplay: true,
      animationData: animDataCopy,
    });

    if (play) {
      animRef.current.goToAndPlay(frame, true);
    } else {
      animRef.current.goToAndStop(frame, true);
    }

    onNewAnimation?.(animRef.current);
  }, [animationData, onNewAnimation]);

  return <div ref={animContainerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '350px', height: '350px' }} />;
}

