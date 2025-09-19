import type { Metadata } from "next";

import "../style.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export const metadata: Metadata = {
  title: "GK",
  description: "Full Stack Developer & Software Engineer",
  icons: {
    icon: "/gk.ico",
  },
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
