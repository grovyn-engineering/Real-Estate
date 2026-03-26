"use client";

import Link from "next/link";

interface Props {
  href: string;
  label: string;
  isActive: boolean;
}

export default function NavTab({ href, label, isActive }: Props) {
  return (
    <Link
      href={href}
      className={`px-5 py-3.5 text-xs font-semibold border-b-2 transition-colors tracking-wide ${
        isActive
          ? "border-blue-500 text-white"
          : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
      }`}
    >
      {label}
    </Link>
  );
}
