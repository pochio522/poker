"use client";
import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import Link from "next/link";

export default async function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const { data: card, error } = await supabase.from("card").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log(card);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
      <div
        style={{
          //divで囲んだところをstyleで配置する
          display: "flex",
          justifyContent: "center",
          // alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <Link href={"/multi"}>
          {/*ページ移動のボタン*/}
          <button className="bg-red-400 text-white px-4 py-2 rounded">
            multiへ
          </button>
        </Link>
      </div>
    </div>
  );
}
