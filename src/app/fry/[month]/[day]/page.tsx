import { birthFryData } from "@/app/data/birth-fry-data";
import TwitterShareButton from "@/app/ui/twitterShareButton";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}): Promise<Metadata> {
  const { month, day } = await params;
  const targetMonth = birthFryData[Number(month) - 1];
  const targetDay = targetMonth.days[Number(day) - 1];
  const fry = targetDay.fry || null;
  const word = targetDay.word || null;
  const displayDate = `${parseInt(month)}月${parseInt(day)}日`;

  const title = `${displayDate}の誕生揚げ`;
  const description =
    fry && word
      ? `${displayDate}の誕生揚げは「${fry}」。揚げ言葉は「${word}」！`
      : `${displayDate} の誕生揚げ`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
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
}

export default async function Page({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}) {
  const { month, day } = await params;
  const monthNum = parseInt(month);
  const dayNum = parseInt(day);
  const targetMonth = birthFryData[monthNum - 1];
  const targetDay = targetMonth.days[dayNum - 1];
  const fry = targetDay.fry || null;
  const word = targetDay.word || null;
  const displayDate = `${monthNum}月${dayNum}日`;

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
      <div className="w-full max-w-screen-sm space-y-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 shadow">
          <h1 className="text-2xl font-bold text-center text-amber-700 mb-4">
            {displayDate} の誕生揚げ
          </h1>
          {fry ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xl text-left border-collapse table-auto">
                <tbody>
                  <tr className="hover:bg-amber-100">
                    <td className="px-1 py-1 w-24 border-b">誕生揚げ</td>
                    <td className="px-2 py-1 border-b font-medium align-middle h-[6rem]">
                      {fry}
                    </td>
                  </tr>
                  <tr className="hover:bg-amber-100">
                    <td className="px-1 py-2 border-b">揚げ言葉</td>
                    <td className="px-2 py-4 border-b font-medium align-top min-h-[3rem]">
                      {word}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">データがありません。</p>
          )}

          <div className="text-center mt-6">
            <TwitterShareButton
              displayDate={displayDate}
              fry={fry || ""}
              word={word || ""}
              month={month}
              day={day}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 text-sm font-medium mt-6">
          <Link
            href={`/fry/${prevMonth}/${prevDay}`}
            className="relative inline-block text-white text-center no-underline w-full max-w-[48%] py-2 px-4 bg-amber-600 before:absolute before:left-[-20px] before:top-0 before:w-0 before:h-0 before:border-t-[28px] before:border-t-transparent before:border-b-[28px] before:border-b-transparent before:border-r-[20px] before:border-r-amber-600 hover:bg-amber-700 transition"
          >
            前の日
            <br />（{prevMonth}月{prevDay}日）
          </Link>
          <Link
            href={`/fry/${nextMonth}/${nextDay}`}
            className="relative inline-block text-white text-center no-underline w-full max-w-[48%] py-2 px-4 bg-amber-600 after:absolute after:right-[-20px] after:top-0 after:w-0 after:h-0 after:border-t-[28px] after:border-t-transparent after:border-b-[28px] after:border-b-transparent after:border-l-[20px] after:border-l-amber-600 hover:bg-amber-700 transition"
          >
            次の日
            <br />（{nextMonth}月{nextDay}日）
          </Link>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
