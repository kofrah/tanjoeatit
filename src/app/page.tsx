import Link from "next/link";
import { birthFryData } from "./data/birth-fry-data";

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
  const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
  const todayDate = String(today.getDate()).padStart(2, "0");
  const todayId = `${todayMonth}${todayDate}`;

  const months = Object.keys(monthDays).map((m) => parseInt(m));

  const todayFry = birthFryData[todayId]?.fry || "―";
  const todayWord = birthFryData[todayId]?.word || "―";

  return (
    <div className="p-4 bg-white text-gray-800 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          誕生揚げとは
        </h1>
        <p className="mb-8 text-center">
          誕生揚げは、各日に定められた揚げものです。
          <br />
          誕生日ごとに揚げ言葉も定められています。
          <br />
          自分の誕生日がどんな揚げか、見てみましょう！
        </p>

        <div className="bg-gray-100 border border-gray-300 rounded p-4 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            本日の誕生揚げ（{today.getFullYear()}年{today.getMonth() + 1}月
            {today.getDate()}日）
          </h2>
          <p className="mb-1">
            🦐 揚げ：<span className="font-medium">{todayFry}</span>
          </p>
          <p>
            📝 揚げ言葉：<span className="font-medium">{todayWord}</span>
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          誕生揚げ一覧
        </h1>
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
            <div key={month} className="mb-8">
              <div className="mx-auto w-fit">
                <h2 className="text-2xl font-semibold mb-3 text-gray-700">
                  {month}月の誕生揚げ
                </h2>
                <div className="flex flex-col items-start gap-3">
                  {rows.map((week, idx) => (
                    <div
                      key={idx}
                      className="flex flex-wrap justify-start gap-2"
                    >
                      {week.map((day) => {
                        const mm = String(month).padStart(2, "0");
                        const dd = String(day).padStart(2, "0");
                        const dateId = `${mm}${dd}`;
                        return (
                          <Link
                            key={dateId}
                            href={`/fry/${mm}/${dd}`}
                            className="bg-white text-gray-700 border border-gray-300 rounded px-3 py-1 text-center shadow hover:bg-gray-100 w-14 sm:w-16"
                          >
                            {dd}日
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
