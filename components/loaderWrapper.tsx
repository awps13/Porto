"use client";

import { useState, useEffect } from "react";
import AnimateIn from "./animateIn";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideLoader, setHideLoader] = useState(false);
  const [showAnimateIn, setShowAnimateIn] = useState(false);
  const [fadeOutBlur, setFadeOutBlur] = useState(false);

  // Setelah AnimateIn selesai, mulai fade out blur effect
  useEffect(() => {
    if (showAnimateIn && !fadeOutBlur) {
      const timer = setTimeout(() => {
        setFadeOutBlur(true);
      }, 3000); // 6 detik sesuai durasi AnimateIn

      return () => clearTimeout(timer);
    }
  }, [showAnimateIn, fadeOutBlur]);

  return (
    <>
      {/* ================= PORTFOLIO ================= */}
      {hideLoader && !showAnimateIn && (
        <div className="relative z-0">{children}</div>
      )}

      {/* ================= PORTFOLIO WITH BLUR EFFECT ================= */}
      {showAnimateIn && (
        <div className="relative z-0">
          <div
            className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-100 ease-out ${
              fadeOutBlur ? "opacity-0" : "opacity-100 bg-black/50"
            }`}
          />
          <div
            className={`relative z-0 transition-all duration-100 ease-out ${
              fadeOutBlur ? "blur-none" : "blur-sm"
            }`}
          >
            {children}
          </div>
        </div>
      )}

      {/* ================= VIDEO LINGKARAN ================= */}
      {!hideLoader && (
        <>
          <div className="fixed inset-0 bg-black z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden">
              <video
                src="/loading.mp4"
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover "
                onEnded={() => {
                  setHideLoader(true);
                  setShowAnimateIn(true);
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* ================= ANIMATE IN ================= */}
      {showAnimateIn && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-100 ease-out ${
            fadeOutBlur ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <AnimateIn />
        </div>
      )}
    </>
  );
}
