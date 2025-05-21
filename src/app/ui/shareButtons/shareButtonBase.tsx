"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  icon: ReactNode;
  label: string;
  bgColor: string;
};

export default function ShareButtonBase({ href, icon, label, bgColor }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex ${bgColor} text-white px-5 py-2 rounded font-bold transition
        hover:opacity-90
        shadow-[0_4px_0_rgba(0,0,0,0.2)]
        active:translate-y-[2px] active:shadow-[0_2px_0_rgba(0,0,0,0.2)]
      `}
    >
      <div className="flex items-end gap-2">
        <div className="h-[18px] flex items-end">{icon}</div>
        <span className="text-[14px] drop-shadow-sm leading-none">{label}</span>
      </div>
    </Link>
  );
}
