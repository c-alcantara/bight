"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import fog from "vanta/dist/vanta.fog.min";

const Vanta = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<ReturnType<typeof fog> | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadVanta = async () => {
      const fogEffect = (await import("vanta/dist/vanta.fog.min")).default;
      const THREE = await import("three");

      if (!vantaEffect.current && vantaRef.current) {
        const effect = fogEffect({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xFFFFFF,
          midtoneColor: 0x0,
          lowlightColor: 0x0,
          baseColor: 0xFFFFFFFF,
          blurFactor: 0.42,
          speed: 0.2,
          zoom: 0.4,
        });
        vantaEffect.current = effect;
      }
    };

    loadVanta();

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth) * 2 - 1,
        y: (clientY / innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        top: "-5%",  // Move up slightly
        left: "-5%", // Move left slightly
        width: "110%", // Increase width
        height: "110%", // Increase height
        zIndex: -1,
        ...parallaxStyle
      }}
    />
  );
};

export default dynamic(() => Promise.resolve(Vanta), { ssr: false });



