import { useState, ChangeEvent, FormEvent } from 'react';
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
  documenter: ''
};

export default function useApplicationGeneration() {
  const [applicationGenerate, { isLoading }] = useApplicationGenerateMutation();
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      // Make the request
      const { file_url } = await applicationGenerate(formData).unwrap();
  
      // Redirect to the file URL for download
      window.location.href = file_url;
      toast.success('Your file is downloading...');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Failed to generate application');
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
