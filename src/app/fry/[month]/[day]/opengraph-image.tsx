import { birthFryData } from "@/app/data/birth-fry-data";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "tmpAlt"; // 上書きされる

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

  const fryFontSize =
    fry && fry.length > 20 ? 32 : fry && fry.length > 12 ? 58 : 62;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "1200px",
          height: "630px",
          fontFamily: '"Noto Sans JP"',
        }}
      >
        {/* Background Image */}
        <img
          src={`${baseUrl}/ogp/ogp_frame.png`}
          alt="背景"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Text Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            // top: "15%",
            // left: "5%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyContent: "center",
            textAlign: "center",
            fontSize: 62,
            fontWeight: 700,
            color: "#1f2937",
            padding: "0 80px",
            maxWidth: "1100px", // 折り返しのために制限
            overflowWrap: "break-word", // 長単語を折り返す
            wordBreak: "break-word", // 長い日本語や英語にも対応
          }}
        >
          <div style={{ color: "#374151" }}>{`${displayDate}の誕生揚げは`}</div>
          <div
            style={{
              color: "#000000",
              marginTop: "10px",
              fontWeight: 900,
              fontSize: fryFontSize,
            }}
          >{`${fry}`}</div>
          <div
            style={{ color: "#374151", marginTop: "10px" }}
          >{`揚げ言葉は`}</div>
          <div
            style={{
              color: "#000000",
              marginTop: "10px",
              fontWeight: 900,
              fontSize: "larger",
            }}
          >{`${word}！`}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
