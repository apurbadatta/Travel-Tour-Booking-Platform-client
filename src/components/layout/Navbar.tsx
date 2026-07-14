'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  MapPin,
  PlusCircle,
  Settings,
  Sun,
  Moon,
  Calendar,
  Compass,
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore Tours', href: '/tours' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const authLinks = [
    ...(!isAdmin ? [
      { label: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
      { label: 'Manage Tours', href: '/tours/manage', icon: Compass },
    ] : []),
    { label: 'Add Tour', href: '/tours/add', icon: PlusCircle },
    ...(isAdmin ? [{ label: 'Admin Panel', href: '/admin', icon: Settings }] : []),
  ];

  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-[#1E293B] shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-text-primary">Tourify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-text-secondary"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <span className="font-medium">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface dark:bg-[#1E293B] rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-600">
                    {isAdmin ? (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 font-semibold text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/dashboard/bookings"
                        className="block px-4 py-2 font-semibold text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        User Dashboard
                      </Link>
                    )}
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    {!isAdmin && (
                      <>
                        <Link
                          href="/dashboard/bookings"
                          className="block px-4 py-2 text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          My Bookings
                        </Link>
                        <Link
                          href="/tours/manage"
                          className="block px-4 py-2 text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          My Tours
                        </Link>
                      </>
                    )}
                    <Link
                      href="/tours/add"
                      className="block px-4 py-2 text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Add Tour Place
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-error hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-text-secondary"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
          <div className="px-4 py-4 space-y-3">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-text-secondary hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && (
              <>
                <hr className="my-2 border-gray-200 dark:border-gray-600" />
                <Link
                  href="/dashboard/profile"
                  className="flex items-center space-x-2 py-2 text-text-secondary hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                {authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-2 py-2 text-text-secondary hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </>
            )}

            <hr className="my-2 border-gray-200 dark:border-gray-600" />
            
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <span className="font-medium text-text-primary">{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-left text-error hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block py-2 text-center text-primary hover:text-primary/80 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-2 text-center bg-primary text-white rounded-lg hover:bg-primary/90 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
