import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useApplicationGenerateMutation } from '@/redux/features/authApiSlice';

interface ApplicationFormData {
  department: string;
  lead_researcher: string;
  lead_contactno: string;
  co_researcher1: string;
  co_researcher2: string;
  co_researcher3: string;
  co_researcher4: string;
  co_researcher5: string;
  research_title: string;
  datetime_defense: string;
  place_defense: string;
  panel_chair: string;
  adviser: string;
  panel1: string;
  panel2: string;
  panel3: string;
  documenter: string;
  [key: `co_researcher${number}`]: string;
  [key: `panel${number}`]: string;
}

const initialFormState: ApplicationFormData = {
  department: '',
  lead_researcher: '',
  lead_contactno: '',
  co_researcher1: '',
  co_researcher2: '',
  co_researcher3: '',
  co_researcher4: '',
  co_researcher5: '',
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
  // The mutation now returns an object URL string, not a Blob
  const [applicationGenerate, { isLoading }] = useApplicationGenerateMutation();

  const [formData, setFormData] = useState<ApplicationFormData>(initialFormState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Revoke the old object URL on unmount or when previewUrl changes
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

  // Submit form -> generate doc -> store returned object URL in state
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      // Format the datetime_defense before sending
      const formattedData = {
        ...formData,
        datetime_defense: new Date(formData.datetime_defense).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }), // Converts to "May 31, 2024 @ 12:00 pm"
      };
  
      // Send the formatted data
      const docUrl = await applicationGenerate(formattedData).unwrap();
      setPreviewUrl(docUrl);
      toast.success('Document is ready to view or download!');
    } catch (error: any) {
      console.error('Error generating application document:', error);
      toast.error('Failed to generate application');
    }
  };

  // Download the file by programmatically clicking an <a> link
  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = 'application_document.pdf'; // Adjust the file name/extension as needed
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
