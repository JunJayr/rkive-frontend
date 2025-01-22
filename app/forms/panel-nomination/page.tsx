import type { Metadata } from 'next';
import PanelForm from './PanelForm';

export const metadata: Metadata = {
  title: 'Rkive | Panel Nomination Form',
  description: 'Login to your Rkive account',
};

export default function Page() {
  return <PanelForm />;
}
