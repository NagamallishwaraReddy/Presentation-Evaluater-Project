import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircleIcon, AlertCircleIcon, SparklesIcon } from './icons/Icons';

export const ToastContainer = () => {
  const { toasts, removeToast } = useAuth();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`toast-item toast-${toast.type || 'info'}`}
            role="alert"
          >
            <div style={{ marginTop: '2px' }}>
              {isSuccess && <CheckCircleIcon size={20} className="text-success" />}
              {isError && <AlertCircleIcon size={20} className="text-error" />}
              {!isSuccess && !isError && <SparklesIcon size={20} className="text-primary" />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{toast.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: 'var(--text-muted)',
                fontSize: '1.2rem',
                lineHeight: 1,
                padding: '0.2rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
              }}
              title="Close notification"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};
