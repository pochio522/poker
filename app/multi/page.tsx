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

    console.log(`Updating card: ${trimmedSuit} ${trimmedNumber}`);
    CardList.forEach((card) => {
      console.log(`CardList entry: ${card.suit} ${card.number}`);
      console.log(
        `Suit Unicode comparison: ${card.suit.charCodeAt(
          0
        )} vs ${trimmedSuit.charCodeAt(0)}`
      );
      console.log(
        `Number Unicode comparison: ${card.number.charCodeAt(
          0
        )} vs ${trimmedNumber.charCodeAt(0)}`
      );
    });

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
    updateCardStatus(suit, number);
    console.log(CardList);
  };

  const calculateWinRate = async () => {
    // バリデーション: 必要なカードが揃っているか確認
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
    let boardCards = [
      Boardsuit1 + Boardnumber1,
      Boardsuit2 + Boardnumber2,
      Boardsuit3 + Boardnumber3,
    ];

    const totalSimulations = 1000;
    let myWins = 0;

    const { data: remainingCards, error } = await supabase
      .from("card")
      .select("*")
      .eq("is_on_table", false);

    if (error) {
      console.error("Error fetching remaining cards:", error);
      return;
    }

    for (let i = 0; i < totalSimulations; i++) {
      let enemyCards = [Enesuit1 + Enenumber1, Enesuit2 + Enenumber2];

      // 相手のカードが選択されていない場合、ランダムに選択
      if (
        Enesuit1 === " " ||
        Enenumber1 === " " ||
        Enesuit2 === " " ||
        Enenumber2 === " "
      ) {
        const shuffledCards = [...remainingCards].sort(
          () => 0.5 - Math.random()
        );
        enemyCards = [
          shuffledCards.pop().suit + shuffledCards.pop().number,
          shuffledCards.pop().suit + shuffledCards.pop().number,
        ];
      }

      // ボードの4枚目と5枚目のカードがない場合、ランダムに選択
      const shuffledBoardCards = [...remainingCards].sort(
        () => 0.5 - Math.random()
      );

      if (Boardsuit4 === " " || Boardnumber4 === " ") {
        const card4 = shuffledBoardCards.pop();
        if (card4) {
          boardCards.push(card4.suit + card4.number);
        }
      } else {
        boardCards.push(Boardsuit4 + Boardnumber4);
      }

      if (Boardsuit5 === " " || Boardnumber5 === " ") {
        const card5 = shuffledBoardCards.pop();
        if (card5) {
          boardCards.push(card5.suit + card5.number);
        }
      } else {
        boardCards.push(Boardsuit5 + Boardnumber5);
      }

      const myHandStrength = evaluateHand([...myCards, ...boardCards]);
      const enemyHandStrength = evaluateHand([...enemyCards, ...boardCards]);

      if (myHandStrength > enemyHandStrength) {
        myWins++;
      }

      // Reset boardCards for the next simulation

      boardCards = [
        Boardsuit1 + Boardnumber1,
        Boardsuit2 + Boardnumber2,
        Boardsuit3 + Boardnumber3,
      ];
    }

    const winRate = (myWins / totalSimulations) * 100;
    console.log(`推定勝率: ${winRate.toFixed(2)}%`);
  };

  const evaluateHand = (cards: string[]) => {
    // カードをスートとランクに分ける
    const suits = cards.map((card) => card[0]);
    const ranks = cards.map((card) => card.slice(1));

    // ランクを数値に変換
    const rankValues = ranks.map((rank) => {
      if (rank === "A") return 14;
      if (rank === "K") return 13;
      if (rank === "Q") return 12;
      if (rank === "J") return 11;
      return parseInt(rank, 10);
    });

    // ランクをソート
    rankValues.sort((a, b) => a - b);

    // 手役の判定
    const isFlush = suits.every((suit) => suit === suits[0]);
    const isStraight = rankValues.every((rank, index) => {
      if (index === 0) return true;
      return rank === rankValues[index - 1] + 1;
    });

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
