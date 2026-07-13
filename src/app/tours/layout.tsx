import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Tours - Tourify',
  description:
    'Browse and discover amazing tours across Bangladesh. Filter by category, price, rating, and destination to find your perfect adventure.',
};

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
