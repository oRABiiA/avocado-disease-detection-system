'use client';
import { AlertProvider } from "../context/AlertContext";

export default function ClientProviders({ children }) {
  return (
    <AlertProvider>
      {children}
    </AlertProvider>
  );
}
