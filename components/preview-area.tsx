'use client'

import { gzip } from 'pako';
import { AnimationItem } from 'lottie-web';
import { useEffect, useState } from 'react';
import { useAnimationStore } from '@/store/animation';
import LottieAnimation from '@/components/lottie-animation';

export default function PreviewArea() {
  const animationData = useAnimationStore((state) => state.animationData);
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
    const filename = (animationData as any).nm || 'animation';
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
    <div style={{ marginTop: '20px' }}>
      <div style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px', padding: '20px', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }}>
        <LottieAnimation animationData={animationData} onNewAnimation={setAnimation} />
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => exportAnimation('.tgs')} style={{ padding: '8px 16px', cursor: 'pointer' }}>Export as TGS</button>
        <button onClick={() => exportAnimation('.json')} style={{ padding: '8px 16px', cursor: 'pointer' }}>Export as JSON</button>
      </div>
    </div>
  );
}

