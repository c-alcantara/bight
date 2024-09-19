
import { useState, useEffect } from "react";
import Image from "next/image";

import Form from "../components/Form";
import Vanta from "../components/Vanta";
import { ReactTyped } from "react-typed";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set mounted state to true on component mount

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth) * 2 - 1,
        y: (clientY / innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 10}px, ${
      mousePosition.y * 10
    }px)`,
    transition: "transform 0.1s ease-out",
  };

  if (!isMounted) return null; // Prevent rendering until mounted

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed">
      <Image
        src="b.svg"
        alt="Logo"
        width={60}
        height={60}
        className="fixed left-1/2 transform -translate-x-1/2"
        style={{ top: "25px" }}
      />

      <div className="flex-grow flex items-center justify-center">
        <div
          className="w-4/6 max-w-3xl p-8 backdrop-blur-lg border-2 border-white bg-gradient-to-b from-[rgba(255,2550,255,.3)] to-[rgba(255,255,255,.93)] rounded-3xl shadow-2xl relative"
          style={parallaxStyle}
        >
          <div className="max-w-3xl">
            <Image
              src="bight.svg"
              alt="Logo"
              width={200}
              height={200}
              className="pb-5"
              style={{}}
            />

            <p className="text-xl font-medium mb-8" style={{}}>
              is a seamless support and communication assistant for businesses
              and customers without the typical overhead.
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
              className={"invert"}
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
      <p
        className="text-black fixed left-1/2 transform -translate-x-1/2 text-center font-bold text-2xl"
        style={{ bottom: "20px" }}
      >
        <strong>No</strong>{" "}
        <ReactTyped
          strings={[
            "more victorian hold music.",
            "more endless FAQ pages.",
            "more can you repeat that?",
            "more please try your call again later",
            "more frustration.",
          ]}
          typeSpeed={35}
          backSpeed={25}
          loop
        />
      </p>
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
