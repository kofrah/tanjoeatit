import "./globals.css";
import Header from "./ui/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
