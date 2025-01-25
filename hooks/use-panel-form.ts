// hooks/usePanelGeneration.ts
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { usePanelGenerateMutation } from '@/redux/features/authApiSlice';

export default function usePanelGeneration() {
  const [panelGenerate, { isLoading }] = usePanelGenerateMutation();
  const [formData, setFormData] = useState({
    panelChair: '',
    adviser: '',
    members: ['', '', ''],
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index?: number) => {
    if (typeof index === 'number') {
      const newMembers = [...formData.members];
      newMembers[index] = event.target.value;
      setFormData({ ...formData, members: newMembers });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await panelGenerate(formData).unwrap();
      if (response instanceof Blob) {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Panel_${formData.panelChair}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('Panel document generated successfully!');
      }
    } catch (error) {
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