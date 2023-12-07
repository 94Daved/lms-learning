import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import ToastProvider from "@/components/provider/toast-provider";
import { ConfettiProvider } from "@/components/provider/confetti-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lms",
  description: "Lms platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
