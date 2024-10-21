import Image from "next/image";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export default function Home() {
  return (
    <div className="flex gap-4 mx-4">
      <div className="w-1/2 flex flex-col gap-1">
        <div className="bg-green-400">Column Left Row 1</div>
        <div className="bg-green-400">Column Left Row 2</div>
        <div className="bg-green-400">Column Left Row 3</div>
      </div>
      <div className="w-1/2  flex flex-col gap-1">
        <div className="bg-blue-500">Column Right Row 1</div>
        <div className="bg-blue-500">Column Right Row 2</div>
        <div className="bg-blue-500">Column Right Row 3</div>
      </div>
    </div>
  );
}
