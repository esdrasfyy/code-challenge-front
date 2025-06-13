"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { IoInformation } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = useCallback((toast: { type?: string; title: string; description?: string }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const notificationMeta: Record<string, { icon: React.ElementType; color: string }> = {
  success: { icon: IoInformation, color: "#22c55e" },
  error: { icon: IoInformation, color: "#ef4444" },
  warning: { icon: IoInformation, color: "#eab308" },
  info: { icon: IoInformation, color: "#06b6d4" },
};

const Toast = ({ toast, onClose }: { toast: any; onClose: () => void }) => {
  const { type = "info", title, description } = toast;
  const { icon: Icon, color } = notificationMeta[type] || notificationMeta["info"];

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.3 }} className="relative flex items-start gap-3 p-4 w-80 rounded-md shadow-md bg-bg-secondary backdrop-blur-md border border-primary-brand">
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: color + "20" }}>
          <Icon size={16} color={color} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span style={{ background: color }} className="rounded-full w-2 h-2 animate-pulse block" />
            <p className="text-lg font-medium text-secondary-brand">{title}</p>
          </div>
          {description && <p className="text-sm opacity-65 mt-1">{description}</p>}
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition">
          <LiaTimesSolid size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
