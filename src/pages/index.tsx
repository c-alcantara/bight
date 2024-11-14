import { useState, useEffect } from "react";
import Image from "next/image";
import bight from "./../../public/bight.png";
import b from "./../../public/icons.png";
import Form from "../components/Form";
import Backgr from "@/components/Backgr";
import { ReactTyped } from "react-typed";
import { Fullscreen } from "lucide-react";

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
    transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
    transition: "transform 0.1s ease-out",
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed">
      <div className="fixed top-50  w-full h-full">
        {" "}
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div
          className="w-5/6 max-w-5xl p-4 md:p-7 backdrop-blur-lg border border-white bg-gradient-to-b from-[rgba(255,255,255,.4)] to-[rgba(245,255,255,.99)] rounded-[30px]  shadow-xl shadow-blu/15 relative"
          style={parallaxStyle}
        >
          <div className="max-w-3xl">
           
            <a
              href="https://www.bight.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              title="Bight"
            >
              <Image
                src={bight}
                alt="Logo"
                className=" saturate-[1.4]  saturate-[1.4] w-[60px] md:w-[200px] "
              />
            </a>
            <p
              className="text-lg z-10 md:text-2xl font-medium mb-6 mt-5 text-blu"
              style={{}}
            >
              Bight is the <strong>do-it-for-you</strong> assistant that handles
              communication and support for people and businesses worldwide.
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
                right: "17px",
                cursor: "pointer",
                opacity: "100% ",
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
        className="text-white fixed left-1/2 transform -translate-x-2/4 text-center font-semibold text-xs md:text-2xl"
        style={{ bottom: "20px" }}
      >
        No more{" "}
        <ReactTyped
          strings={[
            "hold music.",
            "endless FAQ pages.",
            "useless chat bots.",
            "'what was that again?'",
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
