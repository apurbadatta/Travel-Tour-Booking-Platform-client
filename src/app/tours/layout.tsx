'use client';

import { useAuth } from '@/lib/auth-context';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const isAdmin = (user as any)?.role === 'admin';

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300">
        <AdminSidebar />
        <div className="lg:pl-64">
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
