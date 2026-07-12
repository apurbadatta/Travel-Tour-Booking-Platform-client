'use client';

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function ToastContainer() {
  const { toasts, removeToast } = useAuth();

  if (toasts.length === 0) return null;

  const icons = {
    error: <AlertCircle className="h-5 w-5 text-error" />,
    success: <CheckCircle className="h-5 w-5 text-success" />,
    info: <Info className="h-5 w-5 text-primary" />,
  };

  const bgColors = {
    error: 'bg-error/10 border-error/20',
    success: 'bg-success/10 border-success/20',
    info: 'bg-primary/10 border-primary/20',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center space-x-3 p-4 rounded-lg border shadow-lg ${bgColors[toast.type]} animate-in slide-in-from-right`}
        >
          {icons[toast.type]}
          <p className="flex-1 text-sm text-text-primary">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-black/5 rounded"
          >
            <X className="h-4 w-4 text-text-secondary" />
          </button>
        </div>
      ))}
    </div>
  );
}
