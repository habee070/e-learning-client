import { Anuphan } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${anuphan.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
