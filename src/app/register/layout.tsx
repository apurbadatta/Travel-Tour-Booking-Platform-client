import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account - Tourify',
  description:
    'Create a free Tourify account to start booking tours, managing trips, and exploring Bangladesh.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
