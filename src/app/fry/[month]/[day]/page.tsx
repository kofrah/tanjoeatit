import { birthFryData } from "@/app/data/birth-fry-data";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}): Promise<Metadata> {
  const { month, day } = await params;
  const mm = String(parseInt(month)).padStart(2, "0");
  const dd = String(parseInt(day)).padStart(2, "0");
  const fullDate = `${mm}${dd}`;
  const fry = birthFryData[fullDate]?.fry || null;
  const word = birthFryData[fullDate]?.word || null;
  const displayDate = `${parseInt(month)}月${parseInt(day)}日`;

  return {
    title: `${displayDate}の誕生揚げ`,
    description:
      fry && word
        ? `今日は${displayDate}の誕生揚げ「${fry}」。揚げ言葉は「${word}」！`
        : `${displayDate} の誕生揚げ`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}) {
  const { month, day } = await params;
  const monthNum = parseInt(month);
  const dayNum = parseInt(day);
  const mm = String(monthNum).padStart(2, "0");
  const dd = String(dayNum).padStart(2, "0");
  const fullDate = `${mm}${dd}`;

  const fry = birthFryData[fullDate]?.fry || null;
  const word = birthFryData[fullDate]?.word || null;
  const displayDate = `${monthNum}月${dayNum}日`;

  // 前後日付計算 with 月跨ぎ考慮
  const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();

  let prevMonth = monthNum;
  let prevDay = dayNum - 1;
  if (prevDay === 0) {
    prevMonth = monthNum === 1 ? 12 : monthNum - 1;
    prevDay = daysInMonth(2025, prevMonth);
  }

  let nextMonth = monthNum;
  let nextDay = dayNum + 1;
  if (nextDay > daysInMonth(2025, monthNum)) {
    nextMonth = monthNum === 12 ? 1 : monthNum + 1;
    nextDay = 1;
  }

  return (
    <div className="p-4 bg-white text-gray-800 min-h-screen flex justify-center">
      <div className="text-center mb-4">
        <Link
          href="/"
          className="inline-block border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
        >
          一覧に戻る
        </Link>
      </div>
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center">
          {displayDate} の誕生揚げ
        </h1>
        {fry ? (
          <>
            <p className="text-xl mb-2 text-center">
              🦐 誕生揚げ:{" "}
              <span className="text-gray-800 font-semibold">{fry}</span>
            </p>
            <p className="text-md mb-6 text-center">
              📝 揚げ言葉:{" "}
              <span className="text-gray-700 font-medium">{word}</span>
            </p>
            <div className="text-center mb-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `今日は${displayDate}の誕生揚げ「${fry}」。揚げ言葉は「${word}」！\n#誕生揚げ\nhttps://yourdomain.com/fry/${month}/${day}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 text-white px-5 py-2 rounded shadow hover:bg-gray-900"
              >
                Xで共有
              </a>
            </div>
          </>
        ) : (
          <p className="text-center">データがありません。</p>
        )}
        <div className="flex justify-between max-w-md mx-auto">
          <Link
            href={`/fry/${prevMonth}/${prevDay}`}
            className="text-blue-600 hover:underline"
          >
            ← 前の日（{prevMonth}月{prevDay}日）
          </Link>
          <Link
            href={`/fry/${nextMonth}/${nextDay}`}
            className="text-blue-600 hover:underline"
          >
            次の日（{nextMonth}月{nextDay}日）→
          </Link>
        </div>
      </div>
    </div>
  );
}
