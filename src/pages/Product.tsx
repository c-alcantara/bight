import React, { useState, useMemo, useEffect, useRef } from "react";
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

  // Ref to store the interval ID
  const intervalRef = useRef(null);

  // Function to smoothly update colors every 500ms
  const updateColors = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear any existing interval
    }

    // Start a new interval that updates colors every 500ms
    intervalRef.current = setInterval(() => {
      setHigh(randomColor());
      setMid(randomColor());
      setLow(randomColor());
    }, 200);

    // Set speed for smooth transitions
    setSpeed(10);
  };

  // Function to reset colors and stop cycling
  const useDefaults = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stop the color cycling when resetting to defaults
      intervalRef.current = null; // Reset the ref
    }

    setHigh(initialHighColor);
    setMid(initialMidColor);
    setLow(initialLowColor);
    setBase(0xffffff); // Reset base color
    setSpeed(initialSpeed); // Reset speed
  };

  // Ensure that the interval is cleared when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Cleanup on unmount
      }
    };
  }, []);

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
        />
      </div>
    </main>
  );
}
