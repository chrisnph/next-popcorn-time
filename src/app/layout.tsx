import type { Metadata } from "next";
import { Arya } from "next/font/google";
import "./globals.scss";
import NavBar from "./components/NavBar";

const arya = Arya({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Popcorn Time",
  description: "Movies in the theater today",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={arya.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
