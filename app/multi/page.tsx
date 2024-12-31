"use client"; //usestateを使うために必要
import React, { useEffect, useState } from "react";
import Card from "../conponents/Card"; //includeみたいなもん Cardという関数を使えるようにする感じ
import { supabase } from "@/utils/supabase";
import { CardList } from "./CardList"; // Import CardList

const Page = () => {
  const [suit1, setSuit1] = useState(" "); //自分の1枚目のカード
  const changeSuit1 = (suit: string) => {
    setSuit1(suit);
  };
  const [number1, setNumber1] = useState(" ");
  const changeNumber1 = (number: string) => {
    setNumber1(number);
  };
  const [suit2, setSuit2] = useState(" "); //自分の2枚目のカード
  const changeSuit2 = (suit: string) => {
    setSuit2(suit);
  };
  const [number2, setNumber2] = useState(" ");
  const changeNumber2 = (number: string) => {
    setNumber2(number);
  };
  const [Enesuit1, setEnesuit1] = useState(" "); //相手の1枚目のカード
  const changeEnesuit1 = (suit: string) => {
    setEnesuit1(suit);
  };
  const [Enenumber1, setEnenumber1] = useState(" ");
  const changeEnenumber1 = (number: string) => {
    setEnenumber1(number);
  };
  const [Enesuit2, setEnesuit2] = useState(" "); //相手の2枚目のカード
  const changeEnesuit2 = (suit: string) => {
    setEnesuit2(suit);
  };
  const [Enenumber2, setEnenumber2] = useState(" ");
  const changeEnenumber2 = (number: string) => {
    setEnenumber2(number);
  };
  const [Boardsuit1, setBoardsuit1] = useState(" "); //ボードの1枚目のカード
  const changeBoardsuit1 = (suit: string) => {
    setBoardsuit1(suit);
  };
  const [Boardnumber1, setBoardnumber1] = useState(" ");
  const changeBoardnumber1 = (number: string) => {
    setBoardnumber1(number);
  };
  const [Boardsuit2, setBoardsuit2] = useState(" "); //ボードの2枚目のカード
  const changeBoardsuit2 = (suit: string) => {
    setBoardsuit2(suit);
  };
  const [Boardnumber2, setBoardnumber2] = useState(" ");
  const changeBoardnumber2 = (number: string) => {
    setBoardnumber2(number);
  };
  const [Boardsuit3, setBoardsuit3] = useState(" "); //ボードの3枚目のカード
  const changeBoardsuit3 = (suit: string) => {
    setBoardsuit3(suit);
  };
  const [Boardnumber3, setBoardnumber3] = useState(" ");
  const changeBoardnumber3 = (number: string) => {
    setBoardnumber3(number);
  };
  const [Boardsuit4, setBoardsuit4] = useState(" "); //ボードの4枚目のカード
  const changeBoardsuit4 = (suit: string) => {
    setBoardsuit4(suit);
  };
  const [Boardnumber4, setBoardnumber4] = useState(" ");
  const changeBoardnumber4 = (number: string) => {
    setBoardnumber4(number);
  };
  const [Boardsuit5, setBoardsuit5] = useState(" "); //ボードの5枚目のカード
  const changeBoardsuit5 = (suit: string) => {
    setBoardsuit5(suit);
  };
  const [Boardnumber5, setBoardnumber5] = useState(" ");
  const changeBoardnumber5 = (number: string) => {
    setBoardnumber5(number);
  };
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

  const calculateWinRate = async () => {
    // 必要なカードの検証
    if (
      !Boardsuit1.trim() ||
      !Boardnumber1.trim() ||
      !Boardsuit2.trim() ||
      !Boardnumber2.trim() ||
      !Boardsuit3.trim() ||
      !Boardnumber3.trim() ||
      !suit1.trim() ||
      !number1.trim() ||
      !suit2.trim() ||
      !number2.trim()
    ) {
      alert("必要なカードが揃っていません。");
      return;
    }

    const myCards = [suit1 + number1, suit2 + number2];
    const boardCards = [
      Boardsuit1 + Boardnumber1,
      Boardsuit2 + Boardnumber2,
      Boardsuit3 + Boardnumber3,
    ];

    const remainingCards = CardList.filter(
      (card) => card.is_on_table === false
    );

    const totalSimulations = 1000;
    let myWins = 0;

    for (let i = 0; i < totalSimulations; i++) {
      // 敵の手札をランダムに選択または設定された値を使用
      const shuffledCards = [...remainingCards].sort(() => 0.5 - Math.random());
      const card1 =
        Enesuit1.trim() && Enenumber1.trim()
          ? { suit: Enesuit1, number: Enenumber1 }
          : shuffledCards.pop();
      const card2 =
        Enesuit2.trim() && Enenumber2.trim()
          ? { suit: Enesuit2, number: Enenumber2 }
          : shuffledCards.pop();

      if (card1 && card2) {
        const enemyCards = [
          card1.suit + card1.number,
          card2.suit + card2.number,
        ];

        // 既存のボードカードを使用またはランダムに選択
        const turnCard =
          Boardsuit4 !== " " && Boardnumber4 !== " "
            ? { suit: Boardsuit4, number: Boardnumber4 }
            : shuffledCards.pop();
        const riverCard =
          Boardsuit5 !== " " && Boardnumber5 !== " "
            ? { suit: Boardsuit5, number: Boardnumber5 }
            : shuffledCards.pop();

        if (turnCard && riverCard) {
          const fullBoard = [
            ...boardCards,
            turnCard.suit + turnCard.number,
            riverCard.suit + riverCard.number,
          ];

          // 手役の強さを評価
          const myHandStrength = evaluateHand([...myCards, ...fullBoard]);
          const enemyHandStrength = evaluateHand([...enemyCards, ...fullBoard]);

          console.log(myHandStrength);
          console.log(enemyHandStrength);

          //TODO: 同じ手だった時ハイカードの判定をせずに相手の勝ちになってしまうので修正する

          if (myHandStrength > enemyHandStrength) {
            myWins++;
          }
        }
      }
    }

    // 全体の勝率を計算
    const winRate = (myWins / totalSimulations) * 100;
    console.log(`推定勝率: ${winRate.toFixed(2)}%`);
  };

  const evaluateHand = (cards: string[]) => {
    console.log("cards", cards);
    // カードをスートとランクに分ける
    //TODO: これを使ってフラッシュの判定をする
    // const suits = cards.map((card) => card[0].replace(/[^\dA-Z]/g, "").trim());
    const ranks = cards.map((card) => {
      const rank = card
        .slice(1)
        .replace(/[^\dA-Z]/g, "")
        .trim();
      console.log(`Card: ${card}, Extracted Rank: ${rank}`);
      return rank;
    });

    // ランクを数値に変換
    const rankValues = ranks.map((rank) => {
      console.log(`Processing rank: ${rank}`);
      if (rank === "A") return 14;
      if (rank === "K") return 13;
      if (rank === "Q") return 12;
      if (rank === "J") return 11;
      const parsedRank = parseInt(rank, 10);
      if (isNaN(parsedRank)) {
        console.error(`Invalid rank encountered: ${rank}`);
        return 0;
      }
      return parsedRank;
    });

    // Enesuit1とEnenumber1の処理
    const enemySuit1 = Enesuit1.replace(/[^\dA-Z]/g, "").trim();
    const enemyNumber1 = Enenumber1.replace(/[^\dA-Z]/g, "").trim();
    console.log(`Enemy Card 1: Suit - ${enemySuit1}, Number - ${enemyNumber1}`);

    // Enesuit2とEnenumber2の処理
    const enemySuit2 = Enesuit2.replace(/[^\dA-Z]/g, "").trim();
    const enemyNumber2 = Enenumber2.replace(/[^\dA-Z]/g, "").trim();
    console.log(`Enemy Card 2: Suit - ${enemySuit2}, Number - ${enemyNumber2}`);

    // Boardsuit4とBoardnumber4の処理
    const boardSuit4 = Boardsuit4.replace(/[^\dA-Z]/g, "").trim();
    const boardNumber4 = Boardnumber4.replace(/[^\dA-Z]/g, "").trim();
    console.log(`Board Card 4: Suit - ${boardSuit4}, Number - ${boardNumber4}`);

    // Boardsuit5とBoardnumber5の処理
    const boardSuit5 = Boardsuit5.replace(/[^\dA-Z]/g, "").trim();
    const boardNumber5 = Boardnumber5.replace(/[^\dA-Z]/g, "").trim();
    console.log(`Board Card 5: Suit - ${boardSuit5}, Number - ${boardNumber5}`);

    console.log(rankValues);

    // ランクをソート
    rankValues.sort((a, b) => a - b);

    console.log(rankValues);

    // 手役の判定
    //TODO: フラッシュの判定を実装する
    const isFlush = false;

    // ストレートの判定
    const isStraight =
      rankValues.every((rank, index) => {
        if (index === 0) return true;
        return rank === rankValues[index - 1] + 1;
      }) ||
      (rankValues.includes(14) &&
        rankValues.slice(0, 4).every((rank, index) => rank === index + 2));

    const rankCounts = rankValues.reduce(
      (acc: Record<number, number>, rank) => {
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>
    );

    const counts = Object.values(rankCounts).sort((a, b) => b - a);

    // 手役の強さを数値で返す
    if (isFlush && isStraight) return 8; // ストレートフラッシュ
    if (counts[0] === 4) return 7; // フォーカード
    if (counts[0] === 3 && counts[1] === 2) return 6; // フルハウス
    if (isFlush) return 5; // フラッシュ
    if (isStraight) return 4; // ストレート
    if (counts[0] === 3) return 3; // スリーカード
    if (counts[0] === 2 && counts[1] === 2) return 2; // ツーペア
    if (counts[0] === 2) return 1; // ワンペア
    return 0; // ハイカード
  };

  return (
    <div className="container mx-auto p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <button onClick={calculateWinRate}>勝率計算</button>
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
          setSuit={changeSuit1}
          number={number1}
          setNumber={changeNumber1}
          isUP={true}
        />
        {/* 自分の2枚目のカード*/}
        <Card
          suit={suit2}
          setSuit={(suit) => changeSuit2(suit)}
          number={number2}
          setNumber={(number) => changeNumber2(number)}
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
          setSuit={changeEnesuit1}
          number={Enenumber1}
          setNumber={changeEnenumber1}
          isUP={true}
        />
        {/* 相手の2枚目のカード*/}
        <Card
          suit={Enesuit2}
          setSuit={changeEnesuit2}
          number={Enenumber2}
          setNumber={changeEnenumber2}
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
          setSuit={changeBoardsuit1}
          number={Boardnumber1}
          setNumber={changeBoardnumber1}
          isUP={false}
        />
        {/* ボードの2枚目のカード*/}
        <Card
          suit={Boardsuit2}
          setSuit={changeBoardsuit2}
          number={Boardnumber2}
          setNumber={changeBoardnumber2}
          isUP={false}
        />
        {/* ボードの3枚目のカード*/}
        <Card
          suit={Boardsuit3}
          setSuit={changeBoardsuit3}
          number={Boardnumber3}
          setNumber={changeBoardnumber3}
          isUP={false}
        />
        {/* ボードの4枚目のカード*/}
        <Card
          suit={Boardsuit4}
          setSuit={changeBoardsuit4}
          number={Boardnumber4}
          setNumber={changeBoardnumber4}
          isUP={false}
        />
        {/* ボードの5枚目のカード*/}
        <Card
          suit={Boardsuit5}
          setSuit={changeBoardsuit5}
          number={Boardnumber5}
          setNumber={changeBoardnumber5}
          isUP={false}
        />
      </div>
    </div>
  );
};

export default Page;
