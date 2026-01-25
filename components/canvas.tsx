"use client";

import { useEffect } from "react";
import { initCursorRain } from "@/scripts/cursor";
import Porto from "./porto";
import Alert from "./alert";

const canvas = () => {
  useEffect(() => {
    initCursorRain();
  }, []);
  return (
    <>
      <canvas id="rain-canvas"/>
      <main className="content">
        {/* <Alert /> */}
        <Porto />
      </main>
    </>
  );
};

export default canvas;
