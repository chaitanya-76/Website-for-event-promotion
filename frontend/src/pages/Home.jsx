import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import titlogo from "../images/tit-logo.png";
import iic from "../images/iic.png";
import iei from "../images/iei.png";
import "remixicon/fonts/remixicon.css";
import Grid from "../background/Grid";
import { useGSAP } from "@gsap/react";
import { EVENT_DATA } from "../data/events";

const EVENT_START = new Date(2026, 5, 5, 9, 0, 0);

const getTimeLeft = () => {
  const diff = EVENT_START.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
};

const STATS = [
  { icon: "ri-calendar-event-line", label: `${EVENT_DATA.length} Events` },
  { icon: "ri-group-line", label: "All Colleges" },
  { icon: "ri-award-line", label: "Certificates" },
  { icon: "ri-gift-line", label: "Prizes" },
];

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center rounded-xl bg-white/80 border border-red-100 shadow-sm min-w-[3.25rem] py-2 px-1.5 sm:min-w-[4rem] sm:py-2.5">
    <span className="text-xl sm:text-2xl font-black text-[#DF2935] tabular-nums leading-none">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1">
      {label}
    </span>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);
  const lowerRef = useRef(null);

  const line1 = "Welcome to Technocrats Institute of Technology, Excellence";
  const line2 = "Event Celebration";
  const fullHeading = `${line1}\n${line2}`;
  const [typedHeading, setTypedHeading] = useState("");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const belowAnimatedRef = useRef(false);
  const [buttonHoverReady, setButtonHoverReady] = useState(false);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) {
      setTypedHeading(fullHeading);
      return;
    }

    let i = 0;
    const speedMs = 40;

    const id = window.setInterval(() => {
      i += 1;
      setTypedHeading(fullHeading.slice(0, i));
      if (i >= fullHeading.length) window.clearInterval(id);
    }, speedMs);

    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        [img1Ref.current, img2Ref.current, img3Ref.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      ).fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "+=0.1",
      );

      gsap.set([paraRef.current, buttonRef.current, lowerRef.current], {
        opacity: 0,
        y: 26,
      });
    },
    { scope: mainRef },
  );

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) {
      if (paraRef.current && buttonRef.current && lowerRef.current) {
        gsap.set([paraRef.current, buttonRef.current, lowerRef.current], {
          opacity: 1,
          y: 0,
        });
        setButtonHoverReady(true);
      }
      return;
    }

    if (belowAnimatedRef.current) return;
    if (typedHeading.length < fullHeading.length) return;
    if (!paraRef.current || !buttonRef.current || !lowerRef.current) return;

    belowAnimatedRef.current = true;
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(paraRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.25")
      .to(lowerRef.current, { opacity: 1, y: 0, duration: 0.65 }, "-=0.15")
      .add(() => setButtonHoverReady(true));
  }, [typedHeading, fullHeading]);

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-transparent text-black font-sans selection:bg-emerald-500 selection:text-black antialiased flex flex-col"
    >
      <Grid />

      <div className="w-full flex items-center justify-between px-4 sm:px-10 lg:px-14 pt-5 sm:pt-8">
        <img
          ref={img1Ref}
          src={titlogo}
          alt="TIT Excellence"
          className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
        />
        <img
          ref={img2Ref}
          src={iei}
          alt="IEI"
          className="h-9 sm:h-11 lg:h-13 w-auto object-contain"
        />
        <img
          ref={img3Ref}
          src={iic}
          alt="IIC"
          className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col sm:justify-center items-center px-4 sm:px-6 lg:px-8 sm:pt-14 lg:pt-24 pb-8 sm:pb-16 max-w-5xl mx-auto text-center relative z-10 w-full">
        <div className="flex-[1] w-full sm:hidden" aria-hidden="true" />
        <div className="flex-[2] sm:flex-none flex flex-col items-center justify-between w-full sm:w-auto min-h-0">
          <div className="w-full flex flex-col items-center">
            <h1
              ref={headingRef}
              className="font-display w-full text-[2.5rem] leading-[1.06] break-words text-balance sm:text-6xl sm:leading-[1.04] lg:text-7xl lg:leading-[1.02] font-black tracking-tight mb-4 sm:mb-6 text-slate-950"
            >
              {typedHeading.split("\n")[0] || ""}
              <br />
              <span className="font-cursive text-[3rem] leading-[1.1] sm:text-6xl sm:leading-[1.04] lg:text-7xl text-[#DF2935] drop-shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                {typedHeading.split("\n")[1] || ""}
              </span>
            </h1>
            <p
              ref={paraRef}
              className="text-slate-500 text-sm sm:text-xl max-w-2xl mb-6 sm:mb-8 leading-relaxed"
            >
              Join us to Showcase your talent and Dedication
            </p>
            <button
              ref={buttonRef}
              onClick={() => navigate("/events")}
              className={`group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-[#DF2935] text-white font-bold rounded-xl transition-[background-color,box-shadow] duration-300 hover:bg-red-600 hover:scale-[1.02] active:scale-95 cursor-pointer will-change-transform ${
                buttonHoverReady ? "transition-transform" : ""
              }`}
            >
              Explore All Events
              <span className="inline-block ml-2 transform transition-transform group-hover:translate-x-1">
                <i className="text-white ri-arrow-right-line"></i>
              </span>
            </button>
          </div>

          <div
            ref={lowerRef}
            className="w-full mt-6 sm:mt-12 pt-5 border-t border-red-100/80"
          >
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#DF2935] mb-3">
              {timeLeft.ended ? "Events are live" : "Countdown to June 5, 2026"}
            </p>
            <div className="flex justify-center gap-2 sm:gap-3 mb-5">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hrs" />
              <CountdownUnit value={timeLeft.minutes} label="Min" />
              <CountdownUnit value={timeLeft.seconds} label="Sec" />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {STATS.map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-600 bg-white/70 border border-gray-200 rounded-full px-3 py-1.5"
                >
                  <i className={`${icon} text-[#DF2935]`} />
                  {label}
                </span>
              ))}
            </div>

            <p className="mt-5 text-[10px] sm:text-xs text-slate-400">
              Organized by TIT Ex. · Anand Nagar, BHEL, Bhopal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
