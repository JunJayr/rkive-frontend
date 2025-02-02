import { useState } from 'react';

export default function useOpenManuscript() {
    const [isOpening, setIsOpening] = useState(false);
  
    const openManuscript = (pdfUrl: string) => {
      try {
        setIsOpening(true);
        // Open the PDF in a new tab with security flags
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } finally {
        setIsOpening(false);
      }
    };
  
    return {
      isOpening,
      openManuscript,
    };
}
