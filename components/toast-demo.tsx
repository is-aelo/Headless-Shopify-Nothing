"use client";

import { useEffect, useState } from "react";

export default function ToastDemo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already closed this toast in this browser
    const isDismissed = localStorage.getItem("demo-toast-dismissed");

    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Persist the closed state so it doesn't reappear on refresh
    localStorage.setItem("demo-toast-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-black border border-[#333] p-4 shadow-2xl max-w-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-white font-mono leading-relaxed">
              THIS IS A DEMO STORE. USE CARD NUMBER{" "}
              <span className="bg-white text-black px-1 font-bold">1</span> AND
              CVV{" "}
              <span className="bg-white text-black px-1 font-bold">111</span> TO
              TEST THE CHECKOUT.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-white transition-colors text-xs font-mono"
          >
            [CLOSE]
          </button>
        </div>
      </div>
    </div>
  );
}
