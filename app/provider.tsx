"use client";
import { ToastProvider } from "@/components/ui/toast";
import { queryClient } from "@/lib/react-query.lib";
import { QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ToastProvider>
  );
}
