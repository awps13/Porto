import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const epilogue = Epilogue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWPS13 | PORTOFOLIO",
  description:
    "This is my best portofolio, you can read my project and certifications",
  icons: {
    icon: [
      { url: "/W_light.png", media: "(prefers-color-scheme: light)" },
      { url: "/W_dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

const themeInitScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t !== 'light' && t !== 'dark') t = 'dark';
      var root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(t);
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${epilogue.variable} ${inter.variable} bg-bg text-fg`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
