import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aims&dream — Sé productivo",
  description: "Audita el balance de tiempo entre tus roles y recibe recomendaciones de IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
