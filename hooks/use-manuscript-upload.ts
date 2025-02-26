import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useManuscriptSubmissionMutation } from '@/redux/features/authApiSlice';

export default function useManuscriptSubmission() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitManuscript, { isLoading }] = useManuscriptSubmissionMutation();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !description || !file) {
      toast.error('Please provide a title, description, and a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('pdf', file);

    try {
      const response = await submitManuscript(formData).unwrap();
      toast.success(`Manuscript "${response.title}" submitted successfully!`);
      resetForm();
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to submit manuscript. Please try again.';
      toast.error(errorMessage);
    }
  };

  return {
    title,
    description,
    file,
    isLoading,
    onChangeTitle,
    onChangeDescription,
    onChangeFile,
    onSubmit,
  };
}