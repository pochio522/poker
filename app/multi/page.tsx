"use client"; //usestateを使うために必要
import React, { useState } from "react";
import Card from "../conponents/Card"; //includeみたいなもん Cardという関数を使えるようにする感じ

const Page = () => {
  const [suit, setSuit] = useState(" ");
  const [number, setNumber] = useState(" ");
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">トランプ</h1>
      {/* suit, number とそれらを更新する関数をCardコンポーネントに渡す */}
      <Card
        suit={suit}
        setSuit={setSuit}
        number={number}
        setNumber={setNumber}
      />
    </div>
  );
};

export default Page;
