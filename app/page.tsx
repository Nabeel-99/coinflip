"use client";

import { useState } from "react";
import Coin from "@/components/Coin";
import ResultTxt from "@/components/ResultTxt";

export default function Home() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const resetCount = () => {
    setIsFlipping(false);
    setCurrentFrame(1);
    setRotation(0);
    setResult("");
    setHeadsCount(0);
    setTailsCount(0);
  };
  const handleClick = () => {
    if (isFlipping) return;
    setResult("");
    setIsFlipping(true);

    const coinAudio = new Audio("/coin.mp3");
    coinAudio.play();

    let frame = 1;
    const startTime = Date.now();

    const duration = 2500 + Math.random() * 1500;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      frame = frame >= 18 ? 1 : frame + 1;
      setCurrentFrame(frame);
      setRotation((prev) => prev + 30);

      if (elapsedTime > duration) {
        clearInterval(interval);

        const result = frame <= 4 || frame >= 14 ? "Heads" : "Tails";
        const final = result === "Heads" ? 1 : 10;
        if (result === "Heads") {
          setHeadsCount((prev) => prev + 1);
        } else {
          setTailsCount((prev) => prev + 1);
        }
        const transitionFrames: number[] = [];
        let temp = frame;
        while (temp !== final) {
          temp = temp >= 18 ? 1 : temp + 1;
          transitionFrames.push(temp);
        }

        let i = 0;
        const transitionToFinal = setInterval(() => {
          setCurrentFrame(transitionFrames[i]);
          setRotation((prev) => prev + 30);
          i++;
          if (i >= transitionFrames.length) {
            clearInterval(transitionToFinal);
            setResult(result);
            setIsFlipping(false);
            setRotation(0);
          }
        }, 50);
      }
    }, 50);
  };
  return (
    <main className="min-h-screen w-full text-white pb-10 ">
      <div className="2xl:container mx-auto flex flex-col relative gap-8   items-center">
        <h1 className="font-bold mb-6 mt-20 text-2xl text-center lg:text-4xl  text-white">
          Coin Flip Simulator
        </h1>
        <Coin
          currentFrame={currentFrame}
          rotation={rotation}
          isFlipping={isFlipping}
        />
        <button
          onClick={handleClick}
          disabled={isFlipping}
          className={`bg-white mt-4 text-black py-4 px-8 text-xl font-bold  ${
            isFlipping
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-white/80"
          }  rounded-xl`}
        >
          Flip Coin
        </button>
        <ResultTxt result={result} />

        <button
          className={`px-4 text-xl py-4 rounded-xl bg-blue-600   text-white ${
            isFlipping
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-blue-500"
          }`}
          onClick={resetCount}
          disabled={isFlipping}
        >
          Reset Count
        </button>
        <div className="flex items-center text-xl gap-10 ">
          <div className="flex flex-col items-center">
            <span className="font-bold text-2xl">Heads</span>
            <span className="text-3xl">{headsCount}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-2xl">Tails</span>
            <span className="text-3xl">{tailsCount}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
