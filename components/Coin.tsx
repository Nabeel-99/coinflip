import React from "react";

interface CoinProps {
  currentFrame: number;
  rotation: number;
  isFlipping: boolean;
}
const Coin = ({ currentFrame, rotation, isFlipping }: CoinProps) => {
  return (
    <>
      <div
        className={`frame-l-${currentFrame} max-lg:hidden bg-[url('/coin_sheet.png')]  w-[320px] h-[310px] bg-no-repeat`}
        style={{
          backgroundSize: "310px 5600px",
          backgroundRepeat: "no-repeat",
          backgroundClip: "content-box",
          overflow: "hidden",
          transform: `rotate(${rotation}deg)`,
          transition: isFlipping ? "transform 0.1s linear" : "none",
        }}
      />
      <div
        className={`frame-${currentFrame} lg:hidden bg-[url('/coin_sheet.png')]  w-[128px] h-[128px] bg-no-repeat`}
        style={{
          backgroundSize: "128px 2400px",
          backgroundRepeat: "no-repeat",
          backgroundClip: "content-box",
          overflow: "hidden",
          transform: `rotate(${rotation}deg)`,
          transition: isFlipping ? "transform 0.1s linear" : "none",
        }}
      />
    </>
  );
};

export default Coin;
