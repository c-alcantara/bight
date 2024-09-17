'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Form from '@/components/form';
import Vanta from '@/components/vanta';
import { ReactTyped } from "react-typed";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed">
      <Image
        src="b.svg"
        alt="Logo"
        width={75}
        height={75}
        className="fixed left-1/2 transform -translate-x-1/2"
        style={{ top: "40px" }}
      />

      <p
        className="text-black fixed left-1/2 transform -translate-x-1/2 text-center font-bold text-2xl"
        style={{ bottom: "180px" }}
      >
        <strong>No</strong>{" "}
        <ReactTyped
          strings={[
            "more victorian hold music.",
            "more endless FAQ pages.",
            "more can you repeat that again?",
            "more ",
            "more frustration.",
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
        />
      </p>

      <div className="flex-grow flex items-center justify-center">
        <div
          className="w-4/6 max-w-3xl p-8 backdrop-blur-lg border-2 border-white bg-gradient-to-b from-[rgba(255,2550,255,.4)] to-[rgba(255,255,255,.93)] rounded-3xl shadow-2xl relative"
          style={parallaxStyle}
        >
          <div className="max-w-3xl">
            <Image
              src="bight.svg"
              alt="Logo"
              width={200}
              height={200}
              className="   pb-5"
              style={{  }}
            />

            <p className="text-xl font-medium  mb-8" style={{}}>
              is a seamless support experience for businesses and customers
              without the typical overhead.
            </p>
          </div>
          <Form />
          <p
            className="text-2xl text-right mt-3 pt-10 cursor-help"
            title="not all features here are described or shown (yet)"
          >
            ✶
          </p>
          <a
            href="https://www.c-alcantara.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit my website"
          >
            <Image
              src="c.svg"
              alt="Logo"
              width={45}
              height={45}
              style={{
                position: "absolute",
                bottom: "30px",
                left: "30px",
                cursor: "pointer",
              }}
            />
          </a>
        </div>
      </div>
      <div>
        <Vanta />
      </div>
      <div className="z-5 fixed left-0 ml-[-10rem] top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-sm text-black opacity-50 whitespace-nowrap x-5">
          designed + developed by christian alcantara
        </p>
      </div>
    </div>
  );
}