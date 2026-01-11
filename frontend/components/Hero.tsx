"use client";

import Prism from "./Prism";
export default function Hero() {
  return (
    <div style={{ width: "100%", height: "120%", position: "relative" }}>
      <Prism
        height={3}
        baseWidth={5.5}
        animationType="rotate"
        glow={1}
        noise={0.2}
        transparent
        scale={2.2}
        hueShift={75}
        colorFrequency={0.6}
        hoverStrength={2}
        inertia={0.05}
        bloom={0.9}
        timeScale={0.5}
      />
    </div>
  );
}
