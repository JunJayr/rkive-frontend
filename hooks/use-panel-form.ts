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
  const [panelGenerate, { isLoading }] = usePanelGenerateMutation();

  const [formData, setFormData] = useState<PanelFormData>(initialFormState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const docUrl = await panelGenerate(formData).unwrap();
      setPreviewUrl(docUrl);
      toast.success('Document is ready for download.');
    } catch (error: any) {
      console.error('Error generating panel document:', error);
      toast.error('Failed to generate panel document');
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = 'panel_document.pdf';
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