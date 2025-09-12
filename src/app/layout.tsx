import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/src/app/styles.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'IdeaRoast — Ruthless Startup Critiques in Seconds',
    template: '%s · IdeaRoast',
  },
  description:
    'Paste your business idea and get a crisp, brutal teardown—risks, competitor moats, unit-economics red flags, and 5 pivots with “how to test this week,” powered by quick web research.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
