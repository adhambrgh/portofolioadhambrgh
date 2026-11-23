"use client";

import Image from "next/image";

/** Foto potret dengan latar blob organik, memakai warna tema (bukan warna referensi). */
export function AboutPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative isolate mx-auto w-full max-w-2xl">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* blob besar kiri-bawah */}
        <path
          d="M96 152c34-46 96-52 140-24s62 84 44 132-62 84-116 92-108-12-130-52-6-104 62-148Z"
          fill="#E8EAF2"
        />
        {/* blob kecil kanan-atas */}
        <path
          d="M292 108c26-8 56 12 62 40s-8 58-32 66-52-6-60-30 -4-68 30-76Z"
          fill="#7886A8"
          opacity="0.18"
        />
      </svg>

      <div className="relative aspect-square w-full overflow-hidden rounded-[46%_54%_48%_52%/50%_44%_56%_50%]">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 95vw, 672px" className="object-cover" />
      </div>
    </div>
  );
}
