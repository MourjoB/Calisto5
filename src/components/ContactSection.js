"use client";

import React, { useState, useEffect } from "react";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    const handleMouseMove = (e) => {
      const card = document.querySelector(".contact-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      card.style.setProperty("--rotate-x", `${rotateX}deg`);
      card.style.setProperty("--rotate-y", `${rotateY}deg`);
    };

    const handleMouseLeave = () => {
      const card = document.querySelector(".contact-card");
      if (!card) return;

      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#fff5e6] to-[#ffe4cc] flex items-center justify-center">
      <div id="contact" className="relative w-full max-w-5xl p-6 perspective">
        <div
          className="contact-card relative bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 transform-gpu"
          style={{
            "--rotate-x": "0deg",
            "--rotate-y": "0deg",
          }}
        >
          <div className="text-center bg-gradient-to-b from-white to-[#fff8f0] border-b border-[#ffe4cc] p-10 relative overflow-hidden">
            <div className="text-6xl mb-6 animate-float">☕</div>
            <h1 className="text-4xl font-bold text-[#4a3228] mb-4 leading-tight hover:translate-z-10 transition-transform">
              Let's Brew Something Great Together
            </h1>
            <p className="text-lg text-[#6b4f43] max-w-3xl mx-auto opacity-0 animate-fade-in">
              Interested in wholesale instant coffee? Fill out the form below, and
              we'll customize a solution that perfectly matches your business
              needs.
            </p>
          </div>

          <div className="relative p-8 bg-[#fff8f0]">
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-[#ffe4cc] border-t-[#c17f59] rounded-full animate-spin"></div>
              </div>
            )}
            <iframe
              src="https://forms.gle/CPCvJ2pPjNZEo5J39"
              className="w-full h-[400px] rounded-lg shadow-sm transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Contact Us Form"
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
