import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useApplicationGenerateMutation } from '@/redux/features/authApiSlice';

interface ApplicationFormData {
  department: string;
  lead_researcher: string;
  lead_contactno: string;
  co_researcher: string;
  co_researcher1: string;
  co_researcher2: string;
  co_researcher3: string;
  co_researcher4: string;
  research_title: string;
  datetime_defense: string;
  place_defense: string;
  panel_chair: string;
  adviser: string;
  panel1: string;
  panel2: string;
  panel3: string;
  documenter: string;
}

const initialFormState: ApplicationFormData = {
  department: '',
  lead_researcher: '',
  lead_contactno: '',
  co_researcher: '',
  co_researcher1: '',
  co_researcher2: '',
  co_researcher3: '',
  co_researcher4: '',
  research_title: '',
  datetime_defense: '',
  place_defense: '',
  panel_chair: '',
  adviser: '',
  panel1: '',
  panel2: '',
  panel3: '',
  documenter: '',
};

export default function useApplicationGeneration() {
  const [applicationGenerate, { isLoading }] = useApplicationGenerateMutation();

  const [formData, setFormData] = useState<ApplicationFormData>(initialFormState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Clean up any Blob URLs when component unmounts or previewUrl changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Update form data on input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the form, generate the PDF (Blob), and create a local preview URL
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // The server returns a Blob (PDF) if properly configured
      const pdfBlob = await applicationGenerate(formData).unwrap();
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPreviewUrl(blobUrl);

      toast.success('Document is ready to view or download!');
    } catch (error: any) {
      console.error('Error generating application document:', error);
      toast.error('Failed to generate application');
    }
  };

  // Download the PDF directly by creating a hidden <a> link and clicking it
  const handleDownload = () => {
    if (!previewUrl) return;

    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = 'application_document.pdf';
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
