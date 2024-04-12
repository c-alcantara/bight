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
  const [highColor, setHigh] = useState(0x0);
  const [midColor, setMid] = useState(0x0);
  const [lowColor, setLow] = useState(0x0);
  const [base, setBase] = useState(0x0);
  const [speed, setSpeed] = useState(1.5);




const updateColors = () => {

    setHigh(Math.floor(Math.random() * 0xFFFFFF));
    setMid(Math.floor(Math.random() * 0xFFFFFF));
    setLow(Math.floor(Math.random() * 0xFFFFFF));
    setBase(Math.floor(Math.random() * 0xFFFFFF));
    setSpeed(22);
  };

  const useDefaults = () => {
    setHigh(0x0);
    setMid(0x0);
    setLow(0x0);
    setBase(base);
    setSpeed(3);
  };


  const key = useMemo(() => `${highColor}-${midColor}-${lowColor}-${base}-${speed}`, [highColor, midColor, lowColor, base, speed]);

  return (
    
    <main>
      <Calcantara />
      <div className="p-10 flex flex-col items-center justify-center h-screen w-100 z-10 relative">
      <div className=" w-full md:w-3/7 lg:w-3/4 mx-auto z-10">
     
        <div className=" border border-white bg-gradient-to-b from-[rgba(255,255,255,0.4)] to-white fade-in-main flex flex-col justify-center items-center  shadow-2xl p-10 rounded-[50px] z-10 relative">
         
    
      
         


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
      </div>
    </main>
  );
}




//, manifesting the ability
//o//f machines to emulate human intellect and perform
//tasks autonomously,
