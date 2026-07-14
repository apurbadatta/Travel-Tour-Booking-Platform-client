'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ToastContainer from '@/components/ui/Toast';
import { ThemeProvider } from '@/lib/theme-context';
import { useAuth } from '@/lib/auth-context';

const adminRoutes = ['/admin'];
const adminTourRoutes = ['/tours/add', '/tours/edit', '/tours/manage'];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAdmin = (user as any)?.role === 'admin';
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAdminOnTourRoute = isAdmin && adminTourRoutes.some((route) => pathname.startsWith(route));
  const hideNavbar = isAdminRoute || isAdminOnTourRoute;

  return (
    <ThemeProvider>
      {!hideNavbar && <Navbar />}
      <main className={`flex-1 ${!hideNavbar ? 'pt-16' : ''}`}>{children}</main>
      {!hideNavbar && <Footer />}
      <ToastContainer />
    </ThemeProvider>
  );
}
