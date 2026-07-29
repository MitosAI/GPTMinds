import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPTMinds — The decision engine for small business",
  description: "GPTMinds builds a living model of how your business decides, so your team and AI can act with context.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
