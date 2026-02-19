"use client";
import { motion } from "motion/react";
import { initCursorRain } from "@/scripts/cursor";
import { useEffect } from "react";
const AnimateIn = () => {
  useEffect(() => {
    initCursorRain();
  }, []);
  return (
    <>
    <canvas id="rain-canvas"/>
    <div
      className="flex flex-col justify-center items-center text-center my-auto h-screen gap-3 2xl:gap-5 bg-transparent overflow-hidden"
      
    >
      <div className="transform -skew-x-12 px-5 ">
        <motion.h1
          className="text-[1.8rem] 2xl:text-[5rem]  2xl:tracking-[1rem] sm:tracking-[0.5rem]"
          initial={{ x: "-120%" }}
          animate={{
            x: ["-120%", "0%", "10%", "1000%"],
          }}
          transition={{
            times: [0, 0.15, 0.85, 1],
            duration: 3,
            ease: ["easeOut", "linear", "easeIn"],
          }}
        >
          PORTOFOLIO | AWPS13
        </motion.h1>
      </div>
      <div className="transform skew-x-12 px-5">
        <motion.h1
          className="text-[1rem] 2xl:text-[3rem] 2xl:tracking-[0.5rem] sm:tracking-[0.25rem]"
          initial={{ x: "120%" }}
          animate={{
            x: ["120%", "10%", "0%", "-1000%"],
          }}
          transition={{
            times: [0, 0.15, 0.85, 1],
            duration: 3,
            ease: ["easeOut", "linear", "easeIn"],
          }}
        >
          AHMAD WILDAN PUTRO SANTOSO
        </motion.h1>
      </div>
    </div>
    </>
  );
};

export default AnimateIn;
