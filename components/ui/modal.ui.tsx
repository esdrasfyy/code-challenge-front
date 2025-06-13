"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiaTimesSolid } from "react-icons/lia";

interface ModalUiProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export function ModalUi({ children, isVisible, onClose, title, description }: ModalUiProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-black z-40" />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="fixed top-1/2 w-full max-w-[1100px] left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded bg-tertiary-brand bg-opacity-90" role="alert">
            <header className="w-full flex justify-between border-b border-primary-brand p-6">
              <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="opacity-45 text-sm">{description}</p>
              </div>
              <button onClick={onClose} className="absolute right-5 top-5 cursor-pointer text-gray-400 hover:bg-white/10 hover:text-secondary-brand duration-300 w-8 h-8 flex justify-center items-center rounded-full">
                <LiaTimesSolid size={20} />
              </button>
            </header>
            <div className="p-6 w-full">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
