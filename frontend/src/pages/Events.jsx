import React, { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { EVENT_DATA } from "../data/events";

const TAG_COLORS = {
  Technical: "bg-blue-50 text-blue-700 border-blue-200",
  Exhibition: "bg-green-50 text-green-700 border-green-200",
  Talk: "bg-purple-50 text-purple-700 border-purple-200",
  Cultural: "bg-orange-50 text-orange-700 border-orange-200",
};

const Events = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const cardsWrapRef = useRef(null);

  const handleOpenModal = (event) => {
    navigate(`/events/${event.slug}`);
  };

  useLayoutEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsWrapRef.current?.querySelectorAll?.("[data-event-card]");

      // Set initial state once, then play timeline for smoother motion.
      gsap.set(headerRef.current, { autoAlpha: 0, y: 8 });
      if (cards?.length) gsap.set(cards, { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(headerRef.current, { autoAlpha: 1, y: 0, duration: 0.45 });
      if (cards?.length) {
        tl.to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
          },
          "-=0.2"
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">

        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DF2935] uppercase tracking-widest mb-4 hover:opacity-70 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight leading-tight">
                Live <span className="text-[#DF2935]">Events</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">Upcoming college events — register before spots fill up</p>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#DF2935] bg-red-50 border border-red-200 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DF2935] animate-pulse inline-block"></span>
              {EVENT_DATA.length} Tracks Live
            </span>
          </div>

          <div className="mt-6 h-px bg-gray-100" />
        </div>

        {/* Event Cards */}
        <div ref={cardsWrapRef} className="flex flex-col gap-4">
          {EVENT_DATA.map((event, index) => (
            <div
              key={event.id}
              data-event-card
              onClick={() => handleOpenModal(event)}
              className="group flex items-stretch bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-200 hover:border-[#DF2935]/50 hover:shadow-[0_4px_20px_rgba(223,41,53,0.08)]"
              style={{ minHeight: '150px' }}
            >
              {/* Left: Image */}
              <div className="w-36 sm:w-44 min-w-[144px] sm:min-w-[176px] flex-shrink-0 overflow-hidden bg-gray-100 relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
              </div>

              {/* Right: Content */}
              <div className="flex flex-col justify-between flex-1 px-4 sm:px-5 py-4">
                {/* Top section */}
                <div>
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    {/* Tag */}
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${TAG_COLORS[event.tag] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                      {event.tag}
                    </span>
                    {/* Date */}
                    <span className="text-xs text-[#DF2935] font-medium bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md">
                      {event.date}
                    </span>
                    {/* Time */}
                    <span className="text-xs text-slate-500 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-md hidden sm:inline-block">
                      {event.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-[#DF2935] transition-colors duration-200 leading-snug mb-1.5">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {event.shortDesc}
                  </p>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-[11px] text-slate-400 font-mono tracking-wider">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(event);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DF2935] bg-red-50 hover:bg-red-100 border border-red-200 hover:border-[#DF2935]/50 px-3 py-1.5 rounded-lg transition-all duration-150"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-10">
          Click any event to view full details and register
        </p>
      </div>
    </div>
  );
};

export default Events;