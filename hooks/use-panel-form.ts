import { useState, ChangeEvent, FormEvent } from 'react';
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
  const [applicationGenerate, { isLoading }] = usePanelGenerateMutation();
  const [formData, setFormData] = useState<PanelFormData>(initialFormState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Make the request
      const { file_url } = await applicationGenerate(formData).unwrap();

      // Redirect to the file URL for download
      window.location.href = file_url;
      toast.success('Your file is downloading...');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Failed to generate panel document');
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
