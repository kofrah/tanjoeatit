import Link from "next/link";
import { birthFryData } from "./data/birth-fry-data";

export const runtime = "edge";

export default function Home() {
  const monthDays: Record<number, number> = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  const today = new Date();
  const todayMM = String(today.getMonth() + 1).padStart(2, "0");
  const todayDD = String(today.getDate()).padStart(2, "0");

  const months = Object.keys(monthDays).map((m) => parseInt(m));

  const todayMonthData = birthFryData.find((m) => m.MM === todayMM);
  const todayInfo = todayMonthData?.days.find((d) => d.DD === todayDD);

  const todayFry = todayInfo?.fry || "―";
  const todayWord = todayInfo?.word || "―";

  return (
    <div className="p-4 bg-white text-gray-800 min-h-screen flex justify-center">
      <div className="w-full max-w-screen-sm">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
            誕生揚げとは
          </h2>
          <p className="mb-8 text-center text-gray-700">
            誕生揚げは、各日に定めた揚げものです。
            <br />
            誕生日ごとに揚げ言葉も定めています。
            <br />
            自分の誕生揚げは何か、見てみましょう！
          </p>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10 shadow">
          <h2 className="text-xl font-semibold mb-4 text-amber-700 text-center">
            本日の誕生揚げ（{String(today.getMonth() + 1)}月{todayDD}日）
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <tbody>
                <tr className="hover:bg-amber-100">
                  <td className="px-4 py-2 border-b">🍽️ 誕生揚げ</td>
                  <td className="px-4 py-2 border-b font-medium">{todayFry}</td>
                </tr>
                <tr className="hover:bg-amber-100">
                  <td className="px-4 py-2 border-b">📝 揚げ言葉</td>
                  <td className="px-4 py-2 border-b font-medium">
                    {todayWord}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            誕生揚げ一覧
          </h2>
          {months.map((month) => {
            const days = Array.from(
              { length: monthDays[month] },
              (_, i) => i + 1
            );
            const rows = [];
            for (let i = 0; i < days.length; i += 7) {
              rows.push(days.slice(i, i + 7));
            }

            return (
              <div key={month} className="mb-10">
                <h3 className="text-xl font-semibold mb-3 text-gray-700 text-center border-b border-gray-200 pb-1">
                  {month}月の誕生揚げ
                </h3>
                <div className="grid gap-2 grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
                  {rows.map((week, idx) => (
                    <div key={idx} className="contents">
                      {week.map((day) => {
                        const monthString = String(month);
                        const dayString = String(day);
                        const dateId = `${monthString}_${dayString}`;
                        return (
                          <Link
                            key={dateId}
                            href={`/fry/${monthString}/${dayString}`}
                            className="bg-white text-gray-700 border border-gray-300 rounded px-4 py-2 text-center shadow hover:bg-amber-100 hover:scale-105 transition w-full whitespace-nowrap"
                          >
                            {dayString}日
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
