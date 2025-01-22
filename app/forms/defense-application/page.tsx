import type { Metadata } from 'next';
import DefenseForm from './DefenseForm';

export const metadata: Metadata = {
  title: 'Rkive | Defense Application Form',
  description: 'Login to your Rkive account',
};

export default function Page() {
  return <DefenseForm />;
}
