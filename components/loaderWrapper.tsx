"use client";

import { useState } from "react";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openGate, setOpenGate] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);

  return (
    <>
      {/* ================= PORTFOLIO ================= */}
      <div className="relative z-0">
        {children}
      </div>

      {/* ================= BACKGROUND HITAM ================= */}
      {!hideLoader && (
        <div
          className={`
            fixed inset-0 bg-black z-40
            transition-opacity duration-700 ease-in-out
            ${openGate ? "opacity-100" : "opacity-100"}
          `}
        />
      )}

      {/* ================= GERBANG ================= */}
      {!hideLoader && (
        <div className="fixed inset-0 z-45 flex overflow-hidden pointer-events-none">
          
          {/* ===== KIRI ===== */}
          <div
            className={`
              flex flex-1 justify-end gap-25
              transition-transform duration-1000 ease-in-out
              ${openGate ? "-translate-x-full" : "translate-x-0"}
            `}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-full bg-[linear-gradient(90deg,rgba(166,166,166,1)_0%,rgba(255,255,255,1)_100%)]"
                
              />
            ))}
          </div>

          {/* ===== KANAN ===== */}
          <div
            className={`
              flex flex-1 justify-start gap-25
              transition-transform duration-1000 ease-in-out
              ${openGate ? "translate-x-full" : "translate-x-0"}
            `}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-full bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(166,166,166,1)_100%)]"
              />
            ))}
          </div>
        </div>
      )}

      {/* ================= VIDEO LINGKARAN ================= */}
      {!hideLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <video
              src="/loading.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover "
              onEnded={() => {
                setOpenGate(true);
                setTimeout(() => setHideLoader(true),1000);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
