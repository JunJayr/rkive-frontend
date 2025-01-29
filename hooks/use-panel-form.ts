import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { usePanelGenerateMutation } from '@/redux/features/authApiSlice';

interface PanelFormData {
  research_title: string;
  co_researcher: string;
  co_researcher1: string;
  co_researcher2: string;
  co_researcher3: string;
  co_researcher4: string;
  lead_researcher: string;
  adviser: string;
  panel_chair: string;
  panel1: string;
  panel2: string;
  panel3: string;
}

const initialFormState: PanelFormData = {
  research_title: '',
  co_researcher: '',
  co_researcher1: '',
  co_researcher2: '',
  co_researcher3: '',
  co_researcher4: '',
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

  // Clean up any Blob URLs when the component unmounts or when previewUrl changes
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

  // Generate the PDF (Blob) and create a preview URL, but do not open it automatically
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const pdfBlob = await panelGenerate(formData).unwrap();
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPreviewUrl(blobUrl);

      toast.success('Document is ready for download.');
    } catch (error: any) {
      console.error('Error generating panel document:', error);
      toast.error('Failed to generate panel document');
    }
  };

  // If user clicks "Download," we create a temporary <a> tag, trigger a click, and remove it
  // The absence of link.target="_blank" ensures most browsers will save the file locally
  const handleDownload = () => {
    if (!previewUrl) return;

    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = 'panel_document.pdf'; // The file name for the downloaded PDF
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
