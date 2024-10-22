import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">トランプ</h1>
      <div className="w-64 h-96 bg-white border-2 border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-between p-4 relative">
        <div className="absolute top-2 left-2 flex flex-col items-center">
          <span className="text-3xl font-bold">A</span>
          <span className="text-3xl">♠</span>
        </div>
        <div className="text-9xl">♠</div>
        <div className="absolute bottom-2 right-2 flex flex-col items-center transform rotate-180">
          <span className="text-3xl font-bold">A</span>
          <span className="text-3xl">♠</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
