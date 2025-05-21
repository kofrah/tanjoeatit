"use client";

import ShareButtonBase from "./shareButtonBase";

type Props = {
  month: string;
  day: string;
};

export default function LineButton({ month, day }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";
  const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    `${baseUrl}/fry/${month}/${day}`
  )}`;

  return (
    <ShareButtonBase
      href={shareUrl}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 30"
          width="16"
          height="16"
          fill="white"
        >
          <path d="M18.006 0C8.06 0 0 6.44 0 14.383c0 4.538 2.928 8.542 7.393 11.143l-1.937 4.558c-.29.68.46 1.3 1.065.89l6.34-4.4c1.65.24 3.35.37 5.145.37 9.947 0 18.006-6.44 18.006-14.38C36.012 6.44 28.037 0 18.006 0z" />
        </svg>
      }
      label="シェアする"
      bgColor="bg-green-500"
    />
  );
}
