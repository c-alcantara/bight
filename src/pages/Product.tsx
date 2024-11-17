// src/pages/Product.tsx
import React, { useState, useMemo, useRef } from "react";
import VantaComponent from "@/components/VantaComponent";
import Bight from "@/components/Bight"; // Assuming this was a typo
import Interact from "@/components/Interact";
import Spline from "@splinetool/react-spline";

// Utility function to generate random color
const randomColor = () => Math.floor(Math.random() * 0xffffff);

// Utility function to interpolate between two colors
const interpolateColor = (
  startColor: number,
  endColor: number,
  factor: number
) => {
  const start = {
    r: (startColor >> 16) & 0xff,
    g: (startColor >> 8) & 0xff,
    b: startColor & 0xff,
  };
  const end = {
    r: (endColor >> 16) & 0xff,
    g: (endColor >> 8) & 0xff,
    b: endColor & 0xff,
  };

  const r = Math.round(start.r + factor * (end.r - start.r));
  const g = Math.round(start.g + factor * (end.g - start.g));
  const b = Math.round(start.b + factor * (end.b - start.b));

  return (r << 16) | (g << 8) | b;
};

export default function Product() {
  const [highColor, setHigh] = useState(0x0);
  const [midColor, setMid] = useState(0x0);
  const [lowColor, setLow] = useState(0x0);
  const [base, setBase] = useState(0x0);
  const [blur, setBlur] = useState(1);
  const [speed, setSpeed] = useState(0.1);

  const stopLoopRef = useRef(false);

  // Function to smoothly update colors, speed, and blur
  const updateColors = () => {
    stopLoopRef.current = false; // Ensure the loop runs when called
    
    let startHighColor = highColor;
    let startMidColor = midColor;
    let startLowColor = lowColor;

    let targetHighColor = randomColor()*4; // Use the randomColor function
    let targetMidColor = randomColor()*3; // Use the randomColor function
    let targetLowColor = randomColor()*2; // Use the randomColor function
  

    let startSpeed = 0.1;
    let targetSpeed = 4;

    let startBlur = 1;
    let targetBlur = 0.6;

    let progress = 0;
    const duration = 100; // Adjust duration for smoothness

    const colorLoop = () => {
      if (stopLoopRef.current) return; // Stop loop if requested

      progress += 1 / duration;

      if (progress >= 1) {
        // Once transition completes, reset progress and pick new target colors
        progress = 0;
        startHighColor = targetHighColor;
        targetHighColor = randomColor()*2; // Use the randomColor function

        startMidColor = targetMidColor;
        targetMidColor = randomColor()*3; // Use the randomColor function

        startLowColor = targetLowColor;
        targetLowColor = randomColor(); // Use the randomColor function

        startSpeed = targetSpeed;
        targetSpeed = 4; // Reset target speed to 10 for continuous increase

        startBlur = targetBlur;
        targetBlur = 0.6; // Reset target blur for continuous decrease
      }

      // Interpolate colors based on progress
      setHigh(interpolateColor(startHighColor, targetHighColor, progress));
      setMid(interpolateColor(startMidColor, targetMidColor, progress));
      setLow(interpolateColor(startLowColor, targetLowColor, progress));

      // Interpolate speed and blur based on progress
      setSpeed(startSpeed + (targetSpeed - startSpeed) * progress);
      setBlur(startBlur + (targetBlur - startBlur) * progress);

      requestAnimationFrame(colorLoop); // Continue updating
    };

    colorLoop(); // Start the loop
  };

  // Function to reset colors, speed, and blur smoothly
  const useDefaults = () => {
    stopLoopRef.current = true; // Stop the color loop

    let startHighColor = highColor;
    let startMidColor = midColor;
    let startLowColor = lowColor;
    let startBaseColor = base;
    let targetHighColor = 0x0;
    let targetMidColor = 0x0;
    let targetLowColor = 0x0;
    let targetBaseColor = 0x0; // Reset target base color

    let startBlur = blur;
    let targetBlur = 1;
    let startSpeed = speed;
    let targetSpeed = 0.1;

    let progress = 0;
    const duration = 500; // Adjust duration for smoothness

    const resetLoop = () => {
      if (progress >= 1) return; // Stop loop when transition completes

      progress += 1 / duration;

      // Interpolate colors based on progress
      setHigh(interpolateColor(startHighColor, targetHighColor, progress));
      setMid(interpolateColor(startMidColor, targetMidColor, progress));
      setLow(interpolateColor(startLowColor, targetLowColor, progress));
      setBase(interpolateColor(startBaseColor, targetBaseColor, progress)); // Interpolate base color

      // Interpolate blur and speed based on progress
      setBlur(startBlur + (targetBlur - startBlur) * progress);
      setSpeed(startSpeed + (targetSpeed - startSpeed) * progress);

      requestAnimationFrame(resetLoop); // Continue updating
    };

    resetLoop(); // Start the loop
  };

  const key = useMemo(
    () => `${highColor}-${midColor}-${lowColor}-${base}-${speed}-${blur}`,
    [highColor, midColor, lowColor, base, speed, blur]
  );

  return (
    <main className=" relative">
      <div className=" relative z-10 flex h-screen  items-center justify-center">
        <div className=" pt-36 flex-col space-y-28  relative z-10 flex  h-[88%]  w-[92%] flex-col items-center justify-center rounded-[30px] bg-gradient-to-b from-white/0 to-black/00  ">
          <Bight /> {/* Assuming this was a typo */}
          {/* Add margin for spacing */}
          <Interact updateColors={updateColors} useDefaults={useDefaults} />
        </div>
        <div className="">
          {/* <Spline
        scene="https://prod.spline.design/UsT7F4lC7Ac6xJS2/scene.splinecode" 
      /> */}
        </div>
        <VantaComponent
          highColor={highColor}
          midColor={midColor}
          lowColor={lowColor}
          base={base}
          speed={speed}
          blur={blur}
        />
      </div>
    </main>
  );
}
