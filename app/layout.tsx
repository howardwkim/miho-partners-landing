import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MiHo Partners — Get real hours back in your week",
  description:
    "A 45-minute Time Saver Audit that hands you one or two tools built for your business. $399, five hours a week back or your money back.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrumentSerif.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
