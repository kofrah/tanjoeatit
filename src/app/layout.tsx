import "./globals.css";

export const metadata = {
  title: "誕生揚げ一覧",
  description: "誕生日ごとの誕生フライとフライ言葉を紹介するサイト",
  openGraph: {
    title: "誕生揚げ",
    description: "あなたの誕生日のフライは何？フライ言葉もチェック！",
    images: [
      {
        url: "/ogp/default.png",
        width: 1200,
        height: 630,
        alt: "誕生フライ OGP",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
