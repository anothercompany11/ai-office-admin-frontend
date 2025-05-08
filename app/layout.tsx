import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./shared/swr-provider";

export const metadata: Metadata = {
  title: "AI 오피스 어드민",
  description: "AI 오피스 어드민",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClientProviders>{children}</ClientProviders>
        <Toaster />
      </body>
    </html>
  );
}
