import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apocalypse Personal Trainer",
  description: "Survive the robot apocalypse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
