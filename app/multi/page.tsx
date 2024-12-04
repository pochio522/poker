"use client"; //usestateを使うために必要
import React, { useState } from "react";
import Card from "../conponents/Card"; //includeみたいなもん Cardという関数を使えるようにする感じ
const Page = () => {
  const [suit1, setSuit1] = useState(" "); //自分の1枚目のカード
  const [number1, setNumber1] = useState(" ");
  const [suit2, setSuit2] = useState(" "); //自分の2枚目のカード
  const [number2, setNumber2] = useState(" ");
  const [Enesuit1, EnesetSuit1] = useState(" "); //相手の1枚目のカード
  const [Enenumber1, EnesetNumber1] = useState(" ");
  const [Enesuit2, EnesetSuit2] = useState(" "); //相手の2枚目のカード
  const [Enenumber2, EnesetNumber2] = useState(" ");
  const [Boardsuit1, BoardsetSuit1] = useState(" "); //ボードの1枚目のカード
  const [Boardnumber1, BoardsetNumber1] = useState(" ");
  const [Boardsuit2, BoardsetSuit2] = useState(" "); //ボードの2枚目のカード
  const [Boardnumber2, BoardsetNumber2] = useState(" ");
  const [Boardsuit3, BoardsetSuit3] = useState(" "); //ボードの3枚目のカード
  const [Boardnumber3, BoardsetNumber3] = useState(" ");
  const [Boardsuit4, BoardsetSuit4] = useState(" "); //ボードの4枚目のカード
  const [Boardnumber4, BoardsetNumber4] = useState(" ");
  const [Boardsuit5, BoardsetSuit5] = useState(" "); //ボードの5枚目のカード
  const [Boardnumber5, BoardsetNumber5] = useState(" ");
  return (
    <div className="container mx-auto p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <h1 className="text-3xl font-bold mb-8">My card</h1>
        <h1 className="text-3xl font-bold mb-8">Enemy card</h1>
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
        {/* suit, number とそれらを更新する関数をCardコンポーネントに渡す 
          自分の1枚目のカード*/}
        <Card
          suit={suit1}
          setSuit={setSuit1}
          number={number1}
          setNumber={setNumber1}
          isUP={true}
        />
        {/* 自分の2枚目のカード*/}
        <Card
          suit={suit2}
          setSuit={setSuit2}
          number={number2}
          setNumber={setNumber2}
          isUP={true}
        />

        <div
          style={{
            borderLeft: "3px solid black", // 自分と相手のカードの間に区切り線
            paddingLeft: "1rem", // 区切り線とカードの間にスペース
          }}
        ></div>

        {/* 相手の1枚目のカード*/}
        <Card
          suit={Enesuit1}
          setSuit={EnesetSuit1}
          number={Enenumber1}
          setNumber={EnesetNumber1}
          isUP={true}
        />
        {/* 相手の2枚目のカード*/}
        <Card
          suit={Enesuit2}
          setSuit={EnesetSuit2}
          number={Enenumber2}
          setNumber={EnesetNumber2}
          isUP={true}
        />
      </div>
      <div //ボードの5枚
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          margin: "40px",
        }}
      >
        {/* ボードの1枚目のカード*/}
        <Card
          suit={Boardsuit1}
          setSuit={BoardsetSuit1}
          number={Boardnumber1}
          setNumber={BoardsetNumber1}
          isUP={false}
        />
        {/* ボードの2枚目のカード*/}
        <Card
          suit={Boardsuit2}
          setSuit={BoardsetSuit2}
          number={Boardnumber2}
          setNumber={BoardsetNumber2}
          isUP={false}
        />
        {/* ボードの3枚目のカード*/}
        <Card
          suit={Boardsuit3}
          setSuit={BoardsetSuit3}
          number={Boardnumber3}
          setNumber={BoardsetNumber3}
          isUP={false}
        />
        {/* ボードの4枚目のカード*/}
        <Card
          suit={Boardsuit4}
          setSuit={BoardsetSuit4}
          number={Boardnumber4}
          setNumber={BoardsetNumber4}
          isUP={false}
        />
        {/* ボードの5枚目のカード*/}
        <Card
          suit={Boardsuit5}
          setSuit={BoardsetSuit5}
          number={Boardnumber5}
          setNumber={BoardsetNumber5}
          isUP={false}
        />
      </div>
    </div>
  );
};

export default Page;
