import React, { useRef, useState, useMemo } from "react";
import { useSpring, animated } from "react-spring"; // Import react-spring
import VantaComponent from "@/components/VantaComponent";
import Bight from "@/components/Bight";
import Interact from "@/components/Interact";
import Calcantara from "@/components/Calcantara";
import AudioPlayer from "@/components/AudioPlayer";
import { Random } from "@/components/Random";
import { voice_ids } from "@/private/voice_ids";

const randomColor = () => Math.floor(Math.random() * 0xffffff);

export default function Product() {
  const [highColor, setHigh] = useState(0x0);
  const [midColor, setMid] = useState(0xffffff);
  const [lowColor, setLow] = useState(0xffffff);
  const [base, setBase] = useState(0x0);
  const [speed, setSpeed] = useState(.1);
  const [truth, setTruth] = useState(false); // Correctly initialize with useState

  const [initialHighColor] = useState(0xffffff);
  const [initialMidColor] = useState(0x0);
  const [initialLowColor] = useState(0x0);
  const [initialSpeed] = useState(0.5);


  const updateColors = () => {

    
    
    setSpeed(10);
  
       setMid(randomColor());
        setHigh(randomColor());
         setLow(randomColor());
 

  
  
  };

  const useDefaults = () => {
    
    setHigh(initialHighColor);
    setMid(initialMidColor);
    setLow(initialLowColor);
    setBase(0xffffff);
    setSpeed(initialSpeed);
  };

  const key = useMemo(
    () => `${highColor}-${midColor}-${lowColor}-${base}-${speed}`,
    [highColor, midColor, lowColor, base, speed]
  );

  return (
    <main className="relative">
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        <div className="relative z-10 flex h-3/4 w-4/5 flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-white/5 to-white/90 p-3 shadow-xl">
          <Bight />
          <Interact updateColors={updateColors} useDefaults={useDefaults} />
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
