"use client"; //usestateを使うために必要
import React, { useState } from "react";

const Page = () => {
  const [suit, setSuit] = useState(" ");
  const [number, setNumber] = useState(" ");
  const handleSuitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuit(event.target.value); // 選択されたスーツに更新
  };
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value); // 選択された数字に更新
  };
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">トランプ</h1>

      {/* スーツ選択用の入力フォーム */}
      <label htmlFor="suit" className="mb-4">
        スーツの選択:
      </label>
      <input
        list="suits" //どのデータリストを使うかid="suits"のデータリストの使用
        id="suit"
        name="suit"
        className="border-2 p-2 mb-5"
        onChange={handleSuitChange}
      />
      <datalist id="suits">
        <option value="♠"></option>
        <option value="♥"></option>
        <option value="♦"></option>
        <option value="♣"></option>
      </datalist>
      {/* 数字選択用の入力フォーム */}
      <label htmlFor="number" className="mb-4">
        数字の選択:
      </label>
      <input
        list="numbers" //どのデータリストを使うかid="numbers"のデータリストの使用
        id="number"
        name="number"
        className="border-2 p-2 mb-5"
        onChange={handleNumberChange}
      />
      <datalist id="numbers">
        <option value="A"></option>
        <option value="K"></option>
        <option value="Q"></option>
        <option value="J"></option>
        <option value="T"></option>
        <option value="9"></option>
        <option value="8"></option>
        <option value="7"></option>
        <option value="6"></option>
        <option value="5"></option>
        <option value="4"></option>
        <option value="3"></option>
        <option value="2"></option>
      </datalist>
      <div className="w-64 h-96 bg-white border-2 border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-between p-4 relative">
        <div className="absolute top-2 left-2 flex flex-col items-center">
          <span className="text-3xl font-bold">{number}</span>
          <span className="text-3xl">{suit}</span>
        </div>
        <div className="text-9xl">{suit}</div>
        <div className="absolute bottom-2 right-2 flex flex-col items-center transform rotate-180">
          <span className="text-3xl font-bold">{number}</span>
          <span className="text-3xl">{suit}</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
