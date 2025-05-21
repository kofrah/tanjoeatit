"use client";

export default function TwitterShareButton({
  displayDate,
  fry,
  word,
  month,
  day,
}: {
  displayDate: string;
  fry: string;
  word: string;
  month: string;
  day: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";
  return (
    <>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${displayDate}の誕生揚げは「${fry}」。\n揚げ言葉は「${word}」！\n#誕生揚げ\n${baseUrl}/fry/${month}/${day}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-black text-white px-5 py-2 rounded shadow transition"
      >
        Xで共有
      </a>
    </>
  );
}
