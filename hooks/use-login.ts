import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation, useGetUserRoleMutation } from '@/redux/features/authApiSlice';
import { setAuthLogin } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [getUserRole] = useGetUserRoleMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    setErrors({});

    try {
      const loginResponse = await login({ email, password }).unwrap();
      const roleResponse = await getUserRole({}).unwrap();

      dispatch(setAuthLogin({
        isSuperuser: roleResponse.is_superuser,
        isStaff: roleResponse.is_staff,
        isActive: roleResponse.is_active,
      }));
      
      toast.success('Logged in');

      if (roleResponse.is_superuser && roleResponse.is_staff && roleResponse.is_active) {
        router.push('/admin');
      } else if (roleResponse.is_staff && roleResponse.is_active) {
        router.push('/staff/dashboard');
      } else if (roleResponse.is_active) {
        router.push('/user/dashboard');
      } else {
        toast.error('Your account is not active.');
      }

    } catch (error: any) {
      if (error.data) {
        // Handle validation errors
        Object.keys(error.data).forEach((field) => {
          const messages = error.data[field];
          if (Array.isArray(messages)) {
            messages.forEach((message) => toast.error(`${message}`));
          } else {
            toast.error(`${messages}`);
          }
        });
      } else {
        toast.error('Failed to log in. Please try again later.');
      }
    }
  };


  return {
    email,
    password,
    isLoading,
    errors,
    onChange,
    onSubmit,
  };
}
