import React, { useState, useMemo } from 'react';
import VantaComponent from "@/components/VantaComponent";
import Bight from '@/components/Bight';
import Interact from './Interact';
import Calcantara from '../components/Calcantara';
import { keys } from '@/private/keys';
import AudioPlayer from '@/components/AudioPlayer';
import { Random } from '../components/Random';
import { voice_ids } from '@/private/voice_ids';

import Today from '@/components/Today';
export default function Home() {
  const [highColor, setHigh] = useState(Math.floor(Math.random() * 0xFFFFFF));
  const [midColor, setMid] = useState(Math.floor(Math.random() * 0xFFFFFF));
  const [lowColor, setLow] = useState(0xffffff);
  const [base, setBase] = useState(0x0);
  const [speed, setSpeed] = useState(2);

  const updateColors = () => {
    setHigh(Math.floor(Math.random() * 0xFFFFFF));
    setMid(Math.floor(Math.random() * 0xFFFFFF));
    setLow(Math.floor(Math.random() * 0xFFFFFF));
    setBase(Math.floor(Math.random() * 0xFFFFFF));
    setSpeed(20);
  };

  const useDefaults = () => {
    setHigh(highColor);
    setMid(midColor);
    setLow(lowColor);
    setBase(base);
    setSpeed(3);
  };


  const key = useMemo(() => `${highColor}-${midColor}-${lowColor}-${base}-${speed}`, [highColor, midColor, lowColor, base, speed]);

  return (
    <main className="p-6 flex flex-col items-center justify-center h-screen w-100 z-10 relative">
      <div className="scale-9 w-full md:w-3/7 lg:w-3/4 mx-auto p-5 z-10">
        <div className="fade-in-main flex flex-col justify-center items-center bg-white shadow-2xl p-10 rounded-[45px] z-10 relative">
          <Calcantara />
          <Bight />
          <Interact
            updateColors={updateColors}
            useDefaults={useDefaults}
            assistantId={keys.assistantID}
            apiKey={keys.openKey}
          />
        </div>
      </div>
      <VantaComponent
        highColor={highColor}
        midColor={midColor}
        lowColor={lowColor}
        base={base}
        speed={speed}
      />
    </main>
  );
}




//, manifesting the ability
//o//f machines to emulate human intellect and perform
//tasks autonomously,
