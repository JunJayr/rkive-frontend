import type { Metadata } from 'next';
import DashboardForm from './DashboardForm';

export const metadata: Metadata = {
  title: 'Rkive | Dashboard',
  description: 'Register to your Rkive account',
};

export default function Page() {
  return <DashboardForm />;
}
