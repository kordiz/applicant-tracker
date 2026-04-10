import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppNav from '@/components/layout/AppNav';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Applicant Tracker',
  description: 'Local-only job application tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          <AppNav />
          <main className="flex-1">{children}</main>
          <Toaster position="bottom-left" />
        </TooltipProvider>
      </body>
    </html>
  );
}
