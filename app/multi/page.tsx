"use client"; //usestateを使うために必要
import React, { useEffect, useState } from "react";
import Card from "../conponents/Card"; //includeみたいなもん Cardという関数を使えるようにする感じ
import { supabase } from "@/utils/supabase";
import { CardList } from "./CardList"; // Import CardList

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

  // カードをSupabase上で更新する関数
  const updateCardStatus = (suit: string, number: string) => {
    const trimmedSuit = suit.trim();
    const trimmedNumber = number.trim();

    const cardIndex = CardList.findIndex(
      (card) => card.suit === trimmedSuit && card.number === trimmedNumber
    );

    if (cardIndex !== -1) {
      CardList[cardIndex].is_on_table = true;
      console.log(
        `Card updated: ${trimmedSuit} ${trimmedNumber}`,
        CardList[cardIndex]
      );
    } else {
      console.error("Card not found:", trimmedSuit, trimmedNumber);
    }
  };

  // カードを選択して更新する関数(選んだカードをFALSEにする)
  const handleCardSelect = (
    suit: string,
    number: string,
    setSuit: (suit: string) => void,
    setNumber: (number: string) => void
  ) => {
    setSuit(suit);
    setNumber(number);
    // updateCardStatus(suit, number);
    // console.log(CardList);
  };

  const calculateWinRate = async () => {
    // Validate necessary cards
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
      // Randomly select opponent's hand
      const shuffledCards = [...remainingCards].sort(() => 0.5 - Math.random());
      const enemyCards = [
        shuffledCards.pop().suit + shuffledCards.pop().number,
        shuffledCards.pop().suit + shuffledCards.pop().number,
      ];

      // Randomly select turn and river cards
      const turnCard = shuffledCards.pop();
      const riverCard = shuffledCards.pop();
      const fullBoard = [
        ...boardCards,
        turnCard.suit + turnCard.number,
        riverCard.suit + riverCard.number,
      ];

      // Evaluate hand strengths
      const myHandStrength = evaluateHand([...myCards, ...fullBoard]);
      const enemyHandStrength = evaluateHand([...enemyCards, ...fullBoard]);

      if (myHandStrength > enemyHandStrength) {
        myWins++;
      }
    }

    // Compute overall win rate
    const winRate = (myWins / totalSimulations) * 100;
    console.log(`推定勝率: ${winRate.toFixed(2)}%`);
  };

  const generateOpponentHandRange = (remainingCards) => {
    const handRange = [];
    for (let i = 0; i < remainingCards.length; i++) {
      for (let j = i + 1; j < remainingCards.length; j++) {
        handRange.push([
          remainingCards[i].suit + remainingCards[i].number,
          remainingCards[j].suit + remainingCards[j].number,
        ]);
      }
    }
    return handRange;
  };

  const evaluateHand = (cards: string[]) => {
    // カードをスートとランクに分ける
    const suits = cards.map((card) => card[0]);
    const ranks = cards.map((card) => {
      const rank = card
        .slice(1)
        .replace(/[^\dA-Z]/g, "")
        .trim(); // 数字とアルファベット以外を除去
      console.log(`Card: ${card}, Extracted Rank: ${rank}`); // 各カードと抽出されたランクをログ出力
      return rank;
    });

    // ランクを数値に変換
    const rankValues = ranks.map((rank) => {
      console.log(`Processing rank: ${rank}`); // 各ランクをデバッグ用にログ出力
      if (rank === "A") return 14;
      if (rank === "K") return 13;
      if (rank === "Q") return 12;
      if (rank === "J") return 11;
      const parsedRank = parseInt(rank, 10);
      if (isNaN(parsedRank)) {
        console.error(`Invalid rank encountered: ${rank}`);
        return 0; // 無効なランクのデフォルト値
      }
      return parsedRank;
    });

    console.log(rankValues);

    // ランクをソート
    rankValues.sort((a, b) => a - b);

    console.log(rankValues);

    // 手役の判定
    const isFlush = suits.every((suit) => suit === suits[0]);

    // Check for straight, including the special case of A-2-3-4-5
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
          setSuit={(suit) =>
            handleCardSelect(suit, number1, setSuit1, setNumber1)
          }
          number={number1}
          setNumber={(number) =>
            handleCardSelect(suit1, number, setSuit1, setNumber1)
          }
          isUP={true}
        />
        {/* 自分の2枚目のカード*/}
        <Card
          suit={suit2}
          setSuit={(suit) =>
            handleCardSelect(suit, number2, setSuit2, setNumber2)
          }
          number={number2}
          setNumber={(number) =>
            handleCardSelect(suit2, number, setSuit2, setNumber2)
          }
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
          setSuit={(suit) =>
            handleCardSelect(suit, Enenumber1, EnesetSuit1, EnesetNumber1)
          }
          number={Enenumber1}
          setNumber={(number) =>
            handleCardSelect(Enesuit1, number, EnesetSuit1, EnesetNumber1)
          }
          isUP={true}
        />
        {/* 相手の2枚目のカード*/}
        <Card
          suit={Enesuit2}
          setSuit={(suit) =>
            handleCardSelect(suit, Enenumber2, EnesetSuit2, EnesetNumber2)
          }
          number={Enenumber2}
          setNumber={(number) =>
            handleCardSelect(Enesuit2, number, EnesetSuit2, EnesetNumber2)
          }
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
          setSuit={(suit) =>
            handleCardSelect(suit, Boardnumber1, BoardsetSuit1, BoardsetNumber1)
          }
          number={Boardnumber1}
          setNumber={(number) =>
            handleCardSelect(Boardsuit1, number, BoardsetSuit1, BoardsetNumber1)
          }
          isUP={false}
        />
        {/* ボードの2枚目のカード*/}
        <Card
          suit={Boardsuit2}
          setSuit={(suit) =>
            handleCardSelect(suit, Boardnumber2, BoardsetSuit2, BoardsetNumber2)
          }
          number={Boardnumber2}
          setNumber={(number) =>
            handleCardSelect(Boardsuit2, number, BoardsetSuit2, BoardsetNumber2)
          }
          isUP={false}
        />
        {/* ボードの3枚目のカード*/}
        <Card
          suit={Boardsuit3}
          setSuit={(suit) =>
            handleCardSelect(suit, Boardnumber3, BoardsetSuit3, BoardsetNumber3)
          }
          number={Boardnumber3}
          setNumber={(number) =>
            handleCardSelect(Boardsuit3, number, BoardsetSuit3, BoardsetNumber3)
          }
          isUP={false}
        />
        {/* ボードの4枚目のカード*/}
        <Card
          suit={Boardsuit4}
          setSuit={(suit) =>
            handleCardSelect(suit, Boardnumber4, BoardsetSuit4, BoardsetNumber4)
          }
          number={Boardnumber4}
          setNumber={(number) =>
            handleCardSelect(Boardsuit4, number, BoardsetSuit4, BoardsetNumber4)
          }
          isUP={false}
        />
        {/* ボードの5枚目のカード*/}
        <Card
          suit={Boardsuit5}
          setSuit={(suit) =>
            handleCardSelect(suit, Boardnumber5, BoardsetSuit5, BoardsetNumber5)
          }
          number={Boardnumber5}
          setNumber={(number) =>
            handleCardSelect(Boardsuit5, number, BoardsetSuit5, BoardsetNumber5)
          }
          isUP={false}
        />
      </div>
    </div>
  );
};

export default Page;
