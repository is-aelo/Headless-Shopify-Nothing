"use client";

import { useState } from "react";

export default function NavbarClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <nav
      onMouseMove={handleMouseMove}
      className="group sticky top-0 z-40 border-b border-border-l bg-off-white/95 backdrop-blur-[2px] transition-colors duration-500 overflow-hidden"
    >
      {/* Background Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.07), transparent 65%)`,
        }}
      />

      {/* Border Spotlight */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(150px circle at ${mousePos.x}px 100%, rgba(0,0,0,0.3), transparent)`,
        }}
      />

      {children}
    </nav>
  );
}
