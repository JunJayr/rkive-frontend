import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { usePanelGenerateMutation } from '@/redux/features/authApiSlice';

interface PanelFormData {
  research_title: string;
  co_researcher1: string;
  co_researcher2: string;
  co_researcher3: string;
  co_researcher4: string;
  co_researcher5: string;
  lead_researcher: string;
  adviser: string;
  panel_chair: string;
  panel1: string;
  panel2: string;
  panel3: string;
  [key: `co_researcher${number}`]: string;
  [key: `panel${number}`]: string;
  
}

const initialFormState: PanelFormData = {
  research_title: '',
  co_researcher1: '',
  co_researcher2: '',
  co_researcher3: '',
  co_researcher4: '',
  co_researcher5: '',
  lead_researcher: '',
  adviser: '',
  panel_chair: '',
  panel1: '',
  panel2: '',
  panel3: '',
};

export default function usePanelGeneration() {
  // This mutation now returns a string (object URL), not a Blob
  const [panelGenerate, { isLoading }] = usePanelGenerateMutation();

  const [formData, setFormData] = useState<PanelFormData>(initialFormState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Revoke any existing object URL when unmounting or changing preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form and store the object URL in state
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // The updated endpoint returns an object URL string
      const docUrl = await panelGenerate(formData).unwrap();
      setPreviewUrl(docUrl);
      toast.success('Document is ready for download.');
    } catch (error: any) {
      console.error('Error generating panel document:', error);
      toast.error('Failed to generate panel document');
    }
  };

  // Trigger file download using the object URL
  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = 'panel_document.pdf'; // or .pdf, depending on the file type
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    formData,
    isLoading,
    previewUrl,
    handleChange,
    handleSubmit,
    handleDownload,
    setPreviewUrl,
  };
}
