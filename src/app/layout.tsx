import type { Metadata } from "next";

import "../style.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export const metadata: Metadata = {
  title: "GK - Computer Science Portfolio",
  description: "Full Stack Developer & Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}