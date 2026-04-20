import { Literata } from "next/font/google";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  variable: "--literata",
});

export const metadata = {
  title: "Reel Reads Club",
  description: "A local book club landing page inspired by Letterboxd.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={literata.variable}>
      <body className="bg-dark text-ink antialiased">{children}</body>
    </html>
  );
}
