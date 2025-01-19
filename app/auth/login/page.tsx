import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Rkive | Login',
  description: 'Login to your Rkive account',
};

export default function Page() {
  return <LoginForm />;
}
