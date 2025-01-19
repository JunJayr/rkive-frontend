import type { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Rkive | Register',
  description: 'Register to your Rkive account',
};

export default function Page() {
  return <RegisterForm />;
}
