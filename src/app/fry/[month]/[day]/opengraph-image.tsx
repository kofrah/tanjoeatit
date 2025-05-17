import { birthFryData } from "@/app/data/birth-fry-data";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}) {
  const { month, day } = await params;
  const targetMonth = birthFryData[Number(month) - 1];
  const targetDay = targetMonth.days[Number(day) - 1];
  const fry = targetDay.fry || null;
  const word = targetDay.word || null;
  const displayDate = `${parseInt(month)}月${parseInt(day)}日`;

  const description =
    fry && word
      ? `${displayDate}の誕生揚げは「${fry}」。揚げ言葉は「${word}」！`
      : `${displayDate} の誕生揚げ`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px",
          border: "16px solid #d97706",
          boxSizing: "border-box",
          fontFamily: '"Noto Sans JP", sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#1f2937",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 28,
            color: "#9ca3af",
          }}
        >
          誕生揚げ.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
