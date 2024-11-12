import React, { useState, useMemo, useRef } from "react";
import VantaComponent from "@/components/VantaComponent";
import Bight from "@/components/Bight";
import Interact from "@/components/Interact";

const randomColor = () => Math.floor(Math.random() * 0xffffff);

export default function Product() {
  const [highColor, setHigh] = useState(0x0);
  const [midColor, setMid] = useState(0xffffff);
  const [lowColor, setLow] = useState(0xffffff);
  const [base, setBase] = useState(0x0);
  const [speed, setSpeed] = useState(0.1);

  const [initialHighColor] = useState(0xffffff);
  const [initialMidColor] = useState(0x0);
  const [initialLowColor] = useState(0x0);
  const [initialSpeed] = useState(0.5);

  // Ref to control stopping the color update loop
  const stopLoopRef = useRef(false);

  // Function to smoothly update colors with pauses between each color change
  const updateColors = () => {
     setSpeed(10);
    stopLoopRef.current = false; // Ensure the loop runs when called

    const colorLoop = async () => {
      while (!stopLoopRef.current) {
        // Change 'high' color
        setHigh(randomColor());
         setMid(randomColor());
         setLow(randomColor());
        await new Promise((resolve) => setTimeout(resolve, 200));

        
      }
    };

    colorLoop(); // Start the loop

    // Set speed for smooth transitions
   
  };

  // Function to reset colors and stop cycling
  const useDefaults = () => {
    stopLoopRef.current = true; // Stop the color loop

    // Reset colors and speed to their initial values
    setHigh(initialHighColor);
    setMid(initialMidColor);
    setLow(initialLowColor);
    setBase(0x0); // Reset base color
    setSpeed(initialSpeed); // Reset speed
  };

  const key = useMemo(
    () => `${highColor}-${midColor}-${lowColor}-${base}-${speed}`,
    [highColor, midColor, lowColor, base, speed]
  );

  return (
    <main className="relative">
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        <div className="backdrop-blur-lg relative z-10 flex h-3/4 w-4/5 flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-white/5 to-white/90 p-3 shadow-xl">
          <Bight />
          <Interact updateColors={updateColors} useDefaults={useDefaults} />
        </div>

        <VantaComponent
          highColor={highColor}
          midColor={midColor}
          lowColor={lowColor}
          base={base}
          speed={speed}
          key={key} // Ensure VantaComponent re-renders when key changes
        />
      </div>
    </main>
  );
}
