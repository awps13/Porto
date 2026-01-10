"use client";

import { useEffect } from "react";
import { initCursorRain } from "@/scripts/cursor";
import Porto from "./porto";

const canvas = () => {
  useEffect(() => {
    initCursorRain();
  }, []);
  return (
    <>
      <canvas id="rain-canvas"/>
      <main className="content">
        <Porto />
      </main>
    </>
  );
};

export default canvas;
