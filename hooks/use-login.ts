import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { setAuth } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({ email, password })
      .unwrap()
      .then((response) => {
        // Store authentication status in Redux
        dispatch(setAuth({
          isSuperuser: response.is_superuser,
          isStaff: response.is_staff,
          isActive: response.is_active,
        }));

        toast.success('Logged in');

        // Role-based navigation
        if (response.is_superuser && response.is_staff && response.is_active) {
          router.push('/admin/dashboard');
        } else if (response.is_staff && response.is_active) {
          router.push('/staff/dashboard');
        } else if (response.is_active) {
          router.push('/dashboard');
        } else {
          toast.error('Account is not active');
        }
      })
      .catch(() => {
        toast.error('Failed to log in');
      });
  };

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
