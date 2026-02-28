"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkStyle = (path) =>
    `block px-4 py-2 rounded ${
      pathname === path
        ? "bg-white text-black font-medium"
        : "hover:bg-gray-700 text-gray-300"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h1 className="text-xl font-bold mb-10">VC Intelligence</h1>

      <nav className="space-y-3">
        <Link href="/companies" className={linkStyle("/companies")}>
          Companies
        </Link>
        <Link href="/lists" className={linkStyle("/lists")}>
          Lists
        </Link>
        <Link href="/saved" className={linkStyle("/saved")}>
          Saved
        </Link>
      </nav>
    </div>
  );
}