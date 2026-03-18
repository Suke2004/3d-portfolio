import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "USTELA SUKESH REDDY | Portfolio",
  description: "Electrical Engineering and Data Science Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
