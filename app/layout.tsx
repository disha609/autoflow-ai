import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AutoFlow AI | AI workflow automation", template: "%s | AutoFlow AI" },
  description: "Turn unstructured business text into summaries, action items, emails, and structured JSON with AI-powered workflows.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 antialiased">{children}</body>
    </html>
  );
}
