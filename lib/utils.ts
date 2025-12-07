import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadDataAsFile(filename: string, extension: string, data: string | Uint8Array) {
    const blob = new Blob([data as any], {
        type: "application/octet-stream"
    });
    const url = window.URL.createObjectURL(blob);

    if (!filename) {
        filename = "sticker";
    }

    const linkElement = document.createElement('a');
    linkElement.setAttribute("href", url);
    linkElement.setAttribute("download", filename + extension);
    linkElement.style.display = 'none';

    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
}

