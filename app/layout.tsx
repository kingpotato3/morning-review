import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Morning Review",
  description: "Your morning edition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Marcellus&family=Cormorant+SC:wght@600;700&family=Aleo:ital,wght@0,400;1,700&family=DM+Serif+Display:ital@1&family=IM+Fell+English:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
