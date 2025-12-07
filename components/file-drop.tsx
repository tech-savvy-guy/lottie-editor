'use client'

import { ungzip } from 'pako';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useAnimationStore } from '@/store/animation';

const VALID_EXTENSIONS = ['.tgs', '.json', '.lottie'];

export default function FileDrop() {
  const [dragover, setDragover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setAnimationData = useAnimationStore((state) => state.setAnimationData);

  const handleFile = (files: FileList | null | undefined) => {
    if (!files?.length) return;
    
    const file = files[0];
    const fileName = file.name.toLowerCase();
    const isValidType = VALID_EXTENSIONS.some(ext => fileName.endsWith(ext));
    
    if (!isValidType) {
      toast.error('Invalid file type', {
        description: 'Please select a .tgs, .json, or .lottie file',
      });
      return;
    }
    
    const reader = new FileReader();
    reader.readAsBinaryString(file);
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
      className={cn(
        'group border border-dashed transition-colors cursor-pointer bg-card/80 max-w-md mx-auto',
        dragover && 'border-foreground bg-muted/30'
      )}
      onDrop={dropFiles}
      onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
      onDragLeave={() => setDragover(false)}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <p className="text-sm font-medium text-foreground mb-1">
          Drop file or click to select a file
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          .tgs, .json, .lottie
        </p>
        <span className="pointer-events-none inline-flex items-center px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest border backdrop-blur-sm transition-all text-foreground border-foreground/30 bg-foreground/5">
          Choose File
        </span>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept=".tgs, .json, .lottie"
          onChange={(e) => handleFile(e.target.files)}
        />
      </div>
    </div>
  );
}

