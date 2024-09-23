

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import clouds2 from "vanta/dist/vanta.clouds.min";

const Vanta = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<ReturnType<typeof clouds2> | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadVanta = async () => {
      const clouds2Effect = (await import("vanta/dist/vanta.clouds.min")).default;
      const THREE = await import("three");

      if (!vantaEffect.current && vantaRef.current) {
        const effect = clouds2Effect({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 2,
          skyColor: 0x996f00,
          cloudColor: 0xffffff,
          lightColor: 0xffffff,
          speed: 0.2,
          texturePath: "../../public/noise.png",
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



