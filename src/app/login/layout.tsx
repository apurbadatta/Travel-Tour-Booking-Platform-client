import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - Tourify',
  description:
    'Sign in to your Tourify account to manage your tours, bookings, and travel plans.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
