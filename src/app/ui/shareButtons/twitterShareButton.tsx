import Image from "next/image";
import ShareButtonBase from "./shareButtonBase";

type Props = {
  displayDate: string;
  fry: string;
  word: string;
  month: string;
  day: string;
};

export default function TwitterShareButton({
  displayDate,
  fry,
  word,
  month,
  day,
}: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";
  const shareText = `${displayDate}の誕生揚げは「${fry}」。\n揚げ言葉は「${word}」！\n#誕生揚げ\n${baseUrl}/fry/${month}/${day}`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}`;

  return (
    <ShareButtonBase
      href={shareUrl}
      icon={
        <Image src="/x-logo-white.png" alt="Xロゴ" width={18} height={18} />
      }
      label="ポスト"
      bgColor="bg-black"
    />
  );
}
