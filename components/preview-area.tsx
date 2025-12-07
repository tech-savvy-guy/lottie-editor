'use client'

import { gzip } from 'pako';
import { AnimationItem } from 'lottie-web';
import { useEffect, useState } from 'react';

import { Kbd } from "@/components/ui/kbd"
import { Button } from '@/components/ui/button';
import { useAnimationStore } from '@/store/animation';
import LottieAnimation from '@/components/lottie-animation';

export default function PreviewArea() {
  const animationData = useAnimationStore((state) => state.animationData);
  const clearAnimationData = useAnimationStore((state) => state.clearAnimationData);
  const [animation, setAnimation] = useState<AnimationItem | null>(null);

  const download = (filename: string, extension: '.tgs' | '.json', data: string | Uint8Array) => {
    const blob = new Blob([data as any]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + extension;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAnimation = (extension: '.tgs' | '.json') => {
    let data: string | Uint8Array = JSON.stringify(animationData, null, 2);
    if (extension === '.tgs') data = gzip(data);
    const filename = 'animation';
    download(filename, extension, data);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!animation) return;
      const node = (e.target as HTMLElement).nodeName.toLowerCase();
      if (node === 'input' || node === 'textarea') return;

      if (e.code === 'Space') {
        e.preventDefault();
        animation.togglePause();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [animation]);

  if (!animationData) return null;

  return (
    <div className='space-y-6'>
      <div className="flex justify-center">
        <button
          onClick={clearAnimationData}
          className="inline-flex items-center px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest border backdrop-blur-sm transition-all text-foreground border-foreground/30 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/50 cursor-pointer"
        >
          Choose New File
        </button>
      </div>
      
      <div className="border border-dashed bg-card max-w-xs mx-auto">
        <div className="flex items-center justify-center p-4">
          <LottieAnimation animationData={animationData} onNewAnimation={setAnimation} />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Button
          onClick={() => exportAnimation('.tgs')}
          className="text-xs shadow-none transition-transform hover:scale-103"
        >
          Export as TGS
        </Button>
        <Button
          onClick={() => exportAnimation('.json')}
          variant="secondary"
          className="text-xs shadow-none transition-transform hover:scale-103"
        >
          Export as JSON
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Press <Kbd>Space</Kbd> to play/pause
      </p>
    </div>
  );
}

