import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-amber-100 border-b border-amber-300 shadow-sm z-50 h-[56px]">
        <div className="max-w-screen-sm mx-auto px-4 h-full flex justify-between items-center text-amber-800">
          <Link
            href="/"
            className="text-lg font-bold tracking-wide hover:opacity-80 transition flex items-center"
          >
            <Image
              src="/karaage.png"
              alt="ロゴ"
              width={42}
              height={42}
              className="inline-block mr-2 mb-1 align-middle"
            />
            誕生揚げ.com
          </Link>
        </div>
      </header>

      {/* 高さ分の空白要素を配置して後続コンテンツが重ならないように */}
      <div className="h-[56px]" aria-hidden="true" />
    </>
  );
}
