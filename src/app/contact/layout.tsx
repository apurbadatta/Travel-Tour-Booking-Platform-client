import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Tourify',
  description:
    'Get in touch with the Tourify team. We are here to help you plan the perfect trip across Bangladesh.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
