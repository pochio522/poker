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
      <div
        style={{
          //divで囲んだところをstyleで配置する
          display: "flex",
          justifyContent: "center",
          // alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        ここをクリックでmultiへ
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
