import React, { useLayoutEffect, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getEventBySlug } from "../data/events";

const EventDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug);
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  if (!event) return <Navigate to="/events" replace />;

  const t = event.theme;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const sections = contentRef.current?.querySelectorAll?.("[data-detail-section]");

      // Initial hero entrance on page load
      gsap.set(heroRef.current, { autoAlpha: 0, y: 10 });
      const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      heroTl.to(heroRef.current, { autoAlpha: 1, y: 0, duration: 0.45 });

      // Scroll-based reveals for lower sections
      if (sections?.length) {
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className={`min-h-screen ${t.bg}`}>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Back */}
        <button
          onClick={() => navigate("/events")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-6 hover:opacity-70 transition-opacity"
          style={{ color: t.primary }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </button>

        {/* Hero card */}
        <div ref={heroRef} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Gradient banner */}
          <div className={`relative bg-gradient-to-r ${t.gradient} px-6 sm:px-10 py-10 sm:py-14 text-white overflow-hidden`}>
            <div className="absolute -top-10 -right-10 text-[180px] opacity-10 select-none">{t.accentEmoji}</div>
            <div className="relative">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-white/20 backdrop-blur px-3 py-1 rounded-full mb-4">
                {event.tag} • Organized by TIT Excellence
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                {event.title}
              </h1>
              <p className="mt-3 text-white/90 text-base sm:text-lg italic">{event.tagline}</p>
            </div>
          </div>

          {/* Poster preview + quick info */}
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 bg-gray-50 p-6 flex items-center justify-center border-r border-gray-100">
              <img
                src={event.image}
                alt={event.title}
                className="rounded-xl shadow-lg max-h-[420px] w-auto object-contain"
              />
            </div>

            <div className="md:col-span-3 p-6 sm:p-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Event Details</h2>

              <div className="grid grid-cols-2 gap-3">
                <InfoTile theme={t} label="Date" value={event.date} />
                <InfoTile theme={t} label="Time" value={event.time} />
                <InfoTile theme={t} label="Venue" value={event.venue} full />
                <InfoTile theme={t} label="Entry Fee" value={event.entryFee} />
                <InfoTile theme={t} label="Team Size" value={event.teamSize} />
              </div>

              <a
                href={event.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: t.primary }}
              >
                Register Now
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div ref={contentRef}>
          {/* About */}
          <div data-detail-section className="px-6 sm:px-10 py-8 border-t border-gray-100">
            <h2 className="text-lg font-bold text-black mb-3">About the Event</h2>
            <p className="text-slate-600 leading-relaxed">{event.longDesc}</p>
          </div>

          {/* Highlights */}
          <div data-detail-section className="px-6 sm:px-10 py-8 border-t border-gray-100" style={{ background: t.primarySoft }}>
            <h2 className="text-lg font-bold text-black mb-4">Event Highlights</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {event.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border rounded-xl px-4 py-3" style={{ borderColor: t.primaryBorder }}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                    style={{ background: t.primary }}
                  >
                    ✓
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coordinators */}
          <div data-detail-section className="px-6 sm:px-10 py-8 border-t border-gray-100">
            <h2 className="text-lg font-bold text-black mb-4">Coordinators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <CoordinatorCard theme={t} role="Faculty Coordinator" name={event.faculty.name} phone={event.faculty.phone} />
              <CoordinatorCard theme={t} role="Student Coordinator" name={event.student.name} phone={event.student.phone} />
            </div>
          </div>
          </div>

          {/* Footer strip */}
          <div className={`bg-gradient-to-r ${t.gradient} px-6 sm:px-10 py-5 text-white text-center text-sm font-medium`}>
            TIT — Autonomous Institute by UGC • Anand Nagar, BHEL, Bhopal (M.P.)
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoTile = ({ label, value, theme, full }) => (
  <div
    className={`rounded-xl border p-3 ${full ? "col-span-2" : ""}`}
    style={{ background: theme.primarySoft, borderColor: theme.primaryBorder }}
  >
    <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.primary }}>{label}</div>
    <div className="text-sm font-semibold text-slate-800 mt-0.5">{value}</div>
  </div>
);

const CoordinatorCard = ({ role, name, phone, theme }) => (
  <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
    <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: theme.primary }}>{role}</div>
    <div className="text-base font-bold text-black">{name}</div>
    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm text-slate-600 hover:underline mt-1 inline-flex items-center gap-1.5">
      📞 {phone}
    </a>
  </div>
);

export default EventDetail;
