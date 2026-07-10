import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { profile } from "@/lib/resumeData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://hemapriya.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    url: siteUrl,
    siteName: profile.name,
    images: ["/images/profile.jpg"],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    images: ["/images/profile.jpg"],
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("portfolio-theme");
    var preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var theme = stored || preferred;
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
