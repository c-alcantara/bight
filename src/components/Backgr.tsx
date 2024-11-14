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
      <div className="saturate-[1.3] fixed top-0 w-full h-[100%] z-[-1]">
        {!isSmallScreen ? (
          <iframe
            src="https://my.spline.design/dunes-85ea128f1e916cace7cad5814d34d979/"
            width="100%"
            height="100%"
          ></iframe>
        ) : (
          <iframe
            src="https://my.spline.design/dunes-85ea128f1e916cace7cad5814d34d979/"
            width="100%"
            height="100%"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Backgr;
