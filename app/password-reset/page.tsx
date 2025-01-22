import type { Metadata } from 'next';
import PasswordReset from './PasswordResetForm';

export const metadata: Metadata = {
  title: 'Rkive | Password Reset',
  description: 'Register to your Rkive account',
};

export default function Page() {
  return <PasswordReset />;
}
