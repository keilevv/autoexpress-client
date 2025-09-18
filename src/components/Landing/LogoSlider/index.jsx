import { useEffect, useRef, useState } from "react";
import SegurosBolivarLogo from "../../../assets/icons/seguros-bolivar.svg";
import SuraLogo from "../../../assets/icons/sura.svg";
import SegurosDelEstadoLogo from "../../../assets/icons/seguros-del-estado.svg";
import MapfreLogo from "../../../assets/icons/mapfre.svg";
import QualitasLogo from "../../../assets/icons/qualitas-logo.svg";

function LogoSlider({ heightClass = "h-12 sm:h-14 md:h-16 lg:h-20", heightClasses = [] }) {
  const logos = [
    { src: SuraLogo, alt: "Sura" },
    { src: SegurosBolivarLogo, alt: "Seguros Bolívar" },
    { src: SegurosDelEstadoLogo, alt: "Seguros del Estado" },
    { src: MapfreLogo, alt: "Mapfre" },
    { src: QualitasLogo, alt: "Quálitas" },
  ];

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return; // Respect reduced motion preference

    let rafId;
    let lastTs = performance.now();
    const speedPxPerSec = 50; // Adjust for desired speed

    const step = (ts) => {
      const dt = (ts - lastTs) / 1000; // seconds
      lastTs = ts;
      if (!paused) {
        const half = track.scrollWidth / 2;
        offsetRef.current -= speedPxPerSec * dt;
        if (Math.abs(offsetRef.current) >= half) {
          offsetRef.current += half; // reset to keep it seamless
        }
        track.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  return (
    <div
      className="w-full overflow-hidden"
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Logos de aseguradoras, desplazándose automáticamente"
      role="region"
    >
      <div
        ref={trackRef}
        className="flex flex-nowrap items-center gap-12 px-6 py-8 w-max will-change-transform"
        style={{ transform: `translateX(0px)` }}
      >
        {[...logos, ...logos].map((logo, idx) => (
          <img
            key={idx}
            src={logo.src}
            alt={logo.alt}
            className={`${heightClasses[idx % logos.length] || heightClass} w-auto object-contain flex-shrink-0 snap-start`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default LogoSlider;
