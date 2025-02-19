import type { Metadata } from 'next';
import SubmitForm from './SubmitForm';

export const metadata: Metadata = {
  title: 'Rkive | Submit Form',
  description: 'Login to your Rkive account',
};

export default function Page() {
  return <SubmitForm />;
}
