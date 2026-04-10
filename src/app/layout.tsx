import type { Metadata } from 'next';
import { Google_Sans_Code } from 'next/font/google';
import './globals.css';
import AppNav from '@/components/layout/AppNav';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip';

const googleSansCode = Google_Sans_Code({
  variable: '--font-google-sans-code',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
      className={`${googleSansCode.variable} h-full antialiased`}
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
