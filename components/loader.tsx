"use client";

import { useState } from "react";

export default function VideoLoader({
  onFinish,
}: {
  onFinish: () => void;
}) {
  return (
    <div className="fixed inset-0 z-9999 bg-white flex items-center justify-center">
      <video
        src="/loading.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
        className="
          w-48 h-48
          object-contain
        "
      />
      
    </div>
  );
}
