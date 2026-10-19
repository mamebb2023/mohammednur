import { useEffect } from "react";

// Named uniquely on purpose: a global `@keyframes pulse` would replace Tailwind's own
// `animate-pulse` everywhere else on the site.
const KEYFRAMES = `
  @keyframes nexus-pulse {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.1) rotate(180deg); opacity: 0.5; }
  }
  @keyframes nexus-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -30px) scale(1.1); }
  }
`;

const NAV = ["Experience", "Technology", "Worlds", "Contact"];

const BOXES = [
  {
    icon: "∞",
    title: "Infinite Worlds",
    text: "Explore limitless virtual environments crafted with precision",
  },
  {
    icon: "◆",
    title: "True Immersion",
    text: "Ultra-realistic sensory experiences powered by next-gen tech",
  },
  {
    icon: "◊",
    title: "Social Presence",
    text: "Connect with others in shared virtual spaces",
  },
  {
    icon: "△",
    title: "Zero Limits",
    text: "Push beyond physical constraints into new dimensions",
  },
];

export default function MetaverseHero() {
  // keyframes live in <head> while this page is mounted, and go when it unmounts
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#8b1a1a_0%,#1a0a0a_50%,#2d1810_100%)] font-['Montserrat'] text-white">
      {/* Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating Blur Elements */}
      <div className="absolute right-[10%] top-[10%] h-75 w-75 animate-[nexus-float_10s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,#ff3e3e_0%,transparent_70%)] opacity-10 blur-[60px]" />

      <div className="absolute bottom-[20%] left-[5%] h-75 w-75 animate-[nexus-float_10s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,#ffa500_0%,transparent_70%)] opacity-10 blur-[60px] [animation-delay:5s]" />

      {/* Background Pulse */}
      <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-[nexus-pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle,rgba(255,62,62,0.15)_0%,transparent_70%)]" />

      {/* Main Container */}
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-8 md:px-16">
          <div className="relative text-2xl font-extralight uppercase tracking-[0.3em]">
            Nexus
            <span className="absolute -bottom-2 left-0 h-px w-15 bg-[#ff3e3e] shadow-[0_0_10px_rgba(255,62,62,0.4)]" />
          </div>

          <nav className="hidden md:block">
            <ul className="flex gap-12">
              {NAV.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="group relative text-sm font-extralight tracking-widest text-white/70 transition hover:text-white"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#ff3e3e] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Hero Content */}
        <section className="grid min-h-[calc(100vh-120px)] grid-cols-1 items-end gap-16 px-6 pb-16 pt-20 md:grid-cols-2 md:px-16 md:pt-24">
          {/* Left Side */}
          <div className="flex flex-col justify-end">
            <h1 className="bg-[linear-gradient(135deg,white_0%,#ffa500_100%)] bg-clip-text text-[clamp(2.5rem,10vw,8rem)] font-extralight uppercase leading-[0.9] tracking-[-0.02em] text-transparent">
              Step Into <br /> Tomorrow
            </h1>

            <p className="mt-4 text-[clamp(1rem,2vw,1.5rem)] font-light tracking-wider text-white/60">
              Where Reality Meets Imagination
            </p>

            <a
              href="#explore"
              className="mt-10 inline-block w-fit border border-[#ff3e3e] px-12 py-4 text-sm font-light uppercase tracking-[0.2em] transition hover:shadow-[0_0_30px_rgba(255,62,62,0.4)]"
            >
              Begin Journey
            </a>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-12 pb-6">
            <p className="max-w-125 text-lg font-light leading-[1.8] text-white/80">
              Experience the next dimension of digital reality. Immerse yourself
              in boundless virtual worlds where creativity knows no limits. Our
              cutting-edge VR technology transcends the ordinary, delivering
              unprecedented experiences that blur the line between the physical
              and digital realms.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {BOXES.map((box) => (
                <div
                  key={box.title}
                  className="group relative cursor-pointer overflow-hidden border border-white/10 bg-white/6 p-8 transition hover:-translate-y-1 hover:border-[#ff3e3e]/40 hover:shadow-[0_10px_40px_rgba(255,62,62,0.2)]"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff3e3e_0%,#ffa500_100%)] opacity-0 transition group-hover:opacity-10" />

                  <span className="relative z-10 block text-3xl">
                    {box.icon}
                  </span>
                  <h3 className="relative z-10 mt-4 text-sm font-light uppercase tracking-widest">
                    {box.title}
                  </h3>
                  <p className="relative z-10 mt-2 text-sm font-extralight leading-relaxed text-white/60">
                    {box.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
