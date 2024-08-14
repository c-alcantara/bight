import React, { useState, useMemo } from 'react';
import VantaComponent from "@/components/VantaComponent";
import Bight from '@/components/Bight';
import Interact from './Interact';
import Calcantara from '../components/Calcantara';
import { keys } from '../../keys';
import AudioPlayer from '@/components/AudioPlayer';
import { Random } from '../components/Random';
import { voice_ids } from '@/private/voice_ids';

// Subsets are really important. CHECK BELOW FOR MORE INFO

import Today from '@/components/Today';
export default function Home() {
  const [highColor, setHigh] = useState(0x0);
  const [midColor, setMid] = useState(0x0);
  const [lowColor, setLow] = useState(0x0);
  const [base, setBase] = useState(0x0);
  const [speed, setSpeed] = useState(0);



const updateColors = () => {

    setHigh(Math.floor(Math.random() * 0xFFFFFF));
    setMid(Math.floor(Math.random() * 0xFFFFFF));
    setLow(Math.floor(Math.random() * 0xFFFFFF));
    setBase(0x0);
    setSpeed(18);


  
  };

  const useDefaults = () => {
   
    setHigh(0x0);
    setMid(0x0);
    setLow(0x0);
    setBase(0x0);
    setSpeed(0);
  };



 

  const key = useMemo(() => `${highColor}-${midColor}-${lowColor}-${base}-${speed}`, [highColor, midColor, lowColor, base, speed]);

  return (
    
    <main >
  
      <Calcantara />
      
      <div className="  flex flex-col items-center justify-center h-screen  z-10 relative">
       
        
        <div className={`  w-[80%]  h-[40rem] fade-in-main-c  border border-white bg-gradient-to-b from-[rgba(255,255,255,0.35)] to-white flex flex-col justify-center items-center shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.05),_0_6.7px_5.3px_rgba(0,_0,_0,_0.06),_0_12.5px_10px_rgba(0,_0,_0,_0.07),_0_22.3px_17.9px_rgba(0,_0,_0,_0.09),_0_41.8px_33.4px_rgba(0,_0,_0,_0.1),_0_100px_80px_rgba(0,_0,_0,_0.14)] p-10 rounded-[60px] z-10 relative`}>
          <Bight />
    
     

      


          <Interact
            updateColors={updateColors}
            useDefaults={useDefaults}
            assistantId={keys.assistantID}
            apiKey={keys.openKey}
          />
    
      </div >
   
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
