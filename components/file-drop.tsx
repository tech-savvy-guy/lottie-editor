'use client'

import { ungzip } from 'pako';
import { useRef, useState } from 'react';
import { useAnimationStore } from '@/store/animation';

export default function FileDrop() {
  const [dragover, setDragover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setAnimationData = useAnimationStore((state) => state.setAnimationData);

  const handleFile = (files: FileList | null | undefined) => {
    if (!files?.length) return;
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.addEventListener('load', (e) => onFileLoaded(e));
  };

  const onFileLoaded = (file: ProgressEvent<FileReader>) => {
    let data = file.target?.result;
    if (data instanceof ArrayBuffer) {
      data = new TextDecoder('utf-8').decode(data);
    }

    if (!data) return;

    try {
      data = new TextDecoder('utf-8').decode(ungzip(data as string));
    } catch (e) {
      // Not gzipped, continue
    }

    try {
      setAnimationData(JSON.parse(data as string));
    } catch (e) {
      console.error('Failed to parse:', e);
    }
  };

  const dropFiles = (e: React.DragEvent) => {
    e.preventDefault();
    setDragover(false);
    handleFile(e.dataTransfer?.files);
  };

  return (
    <div
      style={{
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: dragover ? '#f5f5f5' : 'transparent'
      }}
      onDrop={dropFiles}
      onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
      onDragLeave={() => setDragover(false)}
      onClick={() => fileInputRef.current?.click()}
    >
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>Drop file here or click to select</p>
      <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Choose File</button>
      <input
        type="file"
        ref={fileInputRef}
        accept=".tgs, .json, .lottie"
        onChange={(e) => handleFile(e.target.files)}
        style={{ display: 'none' }}
      />
    </div>
  );
}

