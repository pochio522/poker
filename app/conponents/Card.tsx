//子コンポーネント(multi/page.tsxが親コンポーネント)
import React from "react";

type CardProps = {
  suit: string;
  setSuit: React.Dispatch<React.SetStateAction<string>>; //関数なのでstring型ではダメ
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  isUP: boolean; //bool型
};
const Card = ({ suit, setSuit, number, setNumber, isUP }: CardProps) => {
  //({ suit, setSuit, number, setNumber })親コンポーネントから引き渡される
  //   const [suit, setSuit] = useState(" ");
  //   const [number, setNumber] = useState(" ");
  const handleSuitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuit(event.target.value); // 選択されたスーツに更新
  };
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value); // 選択された数字に更新
  };
  const cardoption = (
    <div>
      {/*スート選択用のプルダウン*/}
      <label htmlFor="suit" className="block mb-1">
        {" "}
        {/*blockはlabelのタグを塊とみる*/} スートの選択:
      </label>
      <select
        name="suit"
        id="suit-select"
        className="border-2 p-2 mb-5"
        onChange={handleSuitChange}
        value={suit}
      >
        <option value="">--スートの選択--</option>
        <option value="♠">♠</option>
        <option value="♥">♥</option>
        <option value="♦">♦</option>
        <option value="♣">♣</option>
      </select>
      {/* 数字選択用のプルダウン */}
      <label htmlFor="number" className="block mb-1">
        数字の選択:
      </label>
      <select
        name="number"
        id="number-select"
        className="border-2 p-2 mb-3"
        onChange={handleNumberChange}
        value={number}
      >
        {/*value=で numberに代入  その横で選択肢に表示される記号*/}
        <option value="">--数字の選択--</option>
        <option value="A">A</option> <option value="K">K</option>
        <option value="Q">Q</option>
        <option value="J">J</option>
        <option value="10">10</option>
        <option value="9">9</option>
        <option value="8">8</option>
        <option value="7">7</option>
        <option value="6">6</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
      </select>
    </div>
  );
  const carddesign = //カードの表示
    (
      <div className="w-32 h-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-between p-4 relative">
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
    );
  return (
    <div className="flex flex-col items-center">
      {isUP ? (
        <div>
          {" "}
          {/*trueの時に選択を上に表示*/}
          {cardoption}
          {carddesign}
        </div>
      ) : (
        <div>
          {" "}
          {/*falseの時に選択を下に表示*/}
          {carddesign}
          {cardoption}
        </div>
      )}
    </div>
  );
};

export default Card;
