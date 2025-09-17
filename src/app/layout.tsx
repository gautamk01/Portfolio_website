import type { Metadata } from "next";

import "../style.css";

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
      <body>{children}</body>
    </html>
  );
}
