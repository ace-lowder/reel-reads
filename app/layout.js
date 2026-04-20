import "./globals.css";

export const metadata = {
  title: "Reel Reads Club",
  description: "A local book club landing page inspired by Letterboxd.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#111418] text-white antialiased">{children}</body>
    </html>
  );
}
