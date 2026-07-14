'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import {
  LayoutDashboard,
  Calendar,
  User,
  MapPin,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  PlusCircle,
} from 'lucide-react';

const sidebarLinks = [
  { label: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
  { label: 'My Profile', href: '/dashboard/profile', icon: User },
  { label: 'Add Tour', href: '/tours/add', icon: PlusCircle },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-text-primary font-bold text-lg tracking-tight">Tourify</span>
            <span className="block text-[10px] text-primary font-semibold uppercase tracking-widest">Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-3 mb-3 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Menu</p>
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'}`} />
              <span className="flex-1">{link.label}</span>
              {active && <ChevronRight className="h-4 w-4 text-primary" />}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="px-4 pb-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      {/* User Info & Logout */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-primary">{user?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-text-secondary truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-error hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-error/20 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface dark:bg-[#1E293B] text-text-primary rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-surface dark:bg-[#0F172A] border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-surface dark:lg:bg-[#0F172A] lg:border-r lg:border-gray-200 dark:lg:border-gray-700 z-30 transition-colors">
        <SidebarContent />
      </aside>
    </>
  );
}
