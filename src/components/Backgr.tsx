"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
const Backgr: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 500); // Adjust the width as needed
    };

    // Initial check
    checkScreenSize();

    // Add event listener to handle window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      <div className="fixed -top-[110px] w-full h-[110%] z-[-1]">
        {!isSmallScreen ? (
          <iframe
            src="https://my.spline.design/futuristicmapinterface-f34f00dd677e5b9199c70175289d0dd1/"
            width="100%"
            height="110%"
          ></iframe>
        ) : (
          <iframe
            src="https://my.spline.design/futuristicmapinterface-f34f00dd677e5b9199c70175289d0dd1/"
            width="100%"
            height="150%"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Backgr;
