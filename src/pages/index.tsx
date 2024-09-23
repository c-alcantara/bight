import { useState, useEffect } from "react";
import Image from "next/image";
import bight from "./../../public/bit.png";
import b from "./../../public/icons.png";
import Form from "../components/Form";
import Backgr from "@/components/Backgr";
import { ReactTyped } from "react-typed";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

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

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed">
      <a
        href="https://www.bight.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        title="Bight"
      >
        <Image
          src={bight}
          alt="Logo"
         
        
          className="fixed left-1/2 transform -translate-x-1/2 translate-y-8 origin-center w-[150px] md:w-[220px] "
        />
      </a>
      <div className="flex-grow flex items-center justify-center">
        <div
          className="w-5/6 max-w-4xl p-6 backdrop-blur-lg border border-white bg-gradient-to-b to-[rgba(255,255,255,.65)] from-[rgba(245,255,255,.95)] rounded-3xl shadow-xl shadow-blu/15 relative"
          style={parallaxStyle}
        >
          <div className="max-w-3xl">
            <Image
              src={b}
              alt="Logo"
              width={75}
              height={75}
              className=" shadow-lg shadow-blu/20 transform rounded-[20px]"
              style={{ top: "30px" }}
            />
            <p
              className="text-md z-10 md:text-2xl font-medium mb-6 mt-5 text-blu"
              style={{}}
            >
              Bight is the <strong>do-it-for-you</strong> assistant that handles
              communication and support between people and businesses worldwide.
            </p>
          </div>
          <Form />
          <a
            href="https://www.c-alcantara.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit my website"
          >
            <br />
            <br />
            <Image
              src="../../c2.svg"
              alt="Logo"
              width={35}
              height={35}
              style={{
                position: "absolute",
                bottom: "15px",
                right: "20px",
                cursor: "pointer",
                opacity: "50% ",
              }}
            />
          </a>
          <a
            href="https://www.c-alcantara.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit my website"
          ></a>
        </div>
      </div>
      <p
        className="text-blu fixed left-1/2 transform -translate-x-2/4 text-center font-semibold text-md md:text-2xl"
        style={{ bottom: "40px" }}
      >
        No more{" "}
        <ReactTyped
          strings={[
            "hold music.",
            "endless FAQ pages.",
            "useless chat bots.",
            "'can you repeat that again?'",
          ]}
          typeSpeed={50}
          backSpeed={25}
          loop
        />
      </p>
      <div>
        <Backgr />
      </div>
    </div>
  );
}
