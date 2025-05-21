import { Metadata } from "next";
import "./globals.css";
import Header from "./ui/header";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost"),
  title: "誕生揚げ一覧",
  description: "誕生日ごとの誕生揚げと揚げ言葉を紹介するサイト",
  openGraph: {
    title: "誕生揚げ",
    description: "あなたの誕生揚げは何？揚げ言葉もチェック！",
  },
};

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
