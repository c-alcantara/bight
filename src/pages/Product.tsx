import React, { useState, useMemo } from "react";
import VantaComponent from "@/components/VantaComponent";
import Bight from "@/components/Bight";
import Interact from "@/components/Interact";
import Calcantara from "@/components/Calcantara";
import AudioPlayer from "@/components/AudioPlayer";
import { Random } from "@/components/Random";
import { voice_ids } from "@/private/voice_ids";

const randomColor = () => Math.floor(Math.random() * 0xffffff);

export default function Product() {
  const [highColor, setHigh] = useState(0x999999);
  const [midColor, setMid] = useState(0x999999);
  const [lowColor, setLow] = useState(0x999999);
  const [base, setBase] = useState(0x0);
  const [speed, setSpeed] = useState(0.75);

  const [initialHighColor] = useState(highColor);
  const [initialMidColor] = useState(midColor);
  const [initialLowColor] = useState(lowColor);

  const updateColors = () => {
    setHigh(randomColor());
    setMid(randomColor());
    setLow(randomColor());
    setBase(0x0);
    setSpeed(20);
  };

  const useDefaults = () => {
    setHigh(initialHighColor);
    setMid(initialMidColor);
    setLow(initialLowColor);
    setBase(0xffffff);
    setSpeed(0.75);
  };

  const key = useMemo(
    () => `${highColor}-${midColor}-${lowColor}-${base}-${speed}`,
    [highColor, midColor, lowColor, base, speed],
  );

  return (
    <main className="relative">
      <Calcantara />
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        <div className="relative z-10 flex h-3/4 w-4/5 flex-col items-center justify-center rounded-3xl border border-white bg-gradient-to-b from-white/20 to-white/95 p-3 shadow-lg">
          <Bight />
          <Interact updateColors={updateColors} useDefaults={useDefaults}  />
        </div>
        <VantaComponent
          highColor={highColor}
          midColor={midColor}
          lowColor={lowColor}
          base={base}
          speed={speed}
        />
      </div>
    </main>
  );
}