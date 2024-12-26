"use client"; //usestateを使うために必要
import React, { useEffect, useState } from "react";
import Card from "../conponents/Card"; //includeみたいなもん Cardという関数を使えるようにする感じ
import { supabase } from "@/utils/supabase";
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
  const updateCardStatus = async (suit, number) => {
    try {
      const { data, error } = await supabase
        .from("card")
        .update({ is_on_table: false }) // is_on_tableをfalseに更新
        .match({ suit, number }); // suitとnumberで特定

      if (error) {
        console.error("Error updating card:", error);
      } else {
        console.log(`Card updated: ${suit} ${number}`, data);
      }
    } catch (err) {
      console.error("Error updating card status:", err);
    }
  };

  // カードを選択して更新する関数(選んだカードをFALSEにする)
  const handleCardSelect = (suit, number, setSuit, setNumber) => {
    setSuit(suit);
    setNumber(number);
    updateCardStatus(suit, number); // Supabaseのデータを更新
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
