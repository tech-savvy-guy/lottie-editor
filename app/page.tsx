'use client'

import FileDrop from '@/components/file-drop';
import PreviewArea from '@/components/preview-area';
import { useAnimationStore } from '@/store/animation';

export default function Home() {
  const animationData = useAnimationStore((state) => state.animationData);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Lottie Converter</h1>
      
      {!animationData && <FileDrop />}
      {animationData && <PreviewArea />}
    </div>
  );
}

