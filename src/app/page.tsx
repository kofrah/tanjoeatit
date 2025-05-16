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

  const months = Object.keys(monthDays).map((m) => parseInt(m));

  const todayMonthData = birthFryData.find((m) => m.MM === todayMonth);
  const todayInfo = todayMonthData?.days.find((d) => d.DD === todayDate);

  const todayFry = todayInfo?.fry || "―";
  const todayWord = todayInfo?.word || "―";

  return (
    <div className="bg-white text-gray-800 min-h-screen flex justify-center px-2">
      <div className=" w-full max-w-screen-sm">
        <h1 className="text-3xl font-bold mt-6 mb-6 text-gray-900 text-center">
          誕生揚げとは
        </h1>
        <p className="mb-8 text-center">
          誕生揚げは、各日に定めた揚げものです。
          <br />
          誕生日ごとに揚げ言葉も定めています。
          <br />
          自分の誕生日がどんな揚げか、見てみましょう！
        </p>

        <div className="bg-gray-100 border border-gray-300 rounded p-4 mb-8 max-w-full overflow-x-auto">
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
                <div className="grid gap-2 grid-cols-4 sm:grid-cols-6 md:grid-cols-7 justify-center">
                  {rows.map((week, idx) => (
                    <div key={idx} className="contents">
                      {week.map((day) => {
                        const mm = String(month).padStart(2, "0");
                        const dd = String(day).padStart(2, "0");
                        const dateId = `${mm}${dd}`;
                        return (
                          <Link
                            key={dateId}
                            href={`/fry/${mm}/${dd}`}
                            className="bg-white text-gray-700 border border-gray-300 rounded px-4 py-2 text-center shadow hover:bg-gray-100 w-full whitespace-nowrap"
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
