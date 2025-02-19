import type { Metadata } from 'next';
import ProfileForm from './ProfileForm';

export const metadata: Metadata = {
  title: 'Rkive | Profile',
  description: 'Register to your Rkive account',
};

export default function Page() {
  return <ProfileForm />;
}
