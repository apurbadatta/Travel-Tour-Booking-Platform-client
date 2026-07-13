'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ToastContainer from '@/components/ui/Toast';

const adminRoutes = ['/admin'];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={`flex-1 ${!isAdminRoute ? 'pt-16' : ''}`}>{children}</main>
      {!isAdminRoute && <Footer />}
      <ToastContainer />
    </>
  );
}
