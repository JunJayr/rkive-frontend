import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useRegister(){
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();
  
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      re_password: '',
    });
  
    const { first_name, last_name, email, password, re_password } = formData;
  
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
  
      setFormData({ ...formData, [name]: value })
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        await register({ first_name, last_name, email, password, re_password }).unwrap();
        toast.success('Please check your email to verify your account');
        router.push('/auth/login');
      } catch (error: any) {
        if (error.data) {
          // Handle validation errors from the backend
          Object.keys(error.data).forEach((field) => {
            const messages = error.data[field];
            if (Array.isArray(messages)) {
              messages.forEach((message) => toast.error(`${message}`));
            } else {
              toast.error(`${messages}`);
            }
          });
        } else {
          toast.error('Failed to register account');
        }
      }
    };

    return{
        first_name, 
        last_name, 
        email, password, 
        re_password,
        isLoading,
        onChange,
        onSubmit,
    }
  
}