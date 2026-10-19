const NAV = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/projects/hero-landscape.webp"
          alt="Serene landscape"
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40" />
      </div>

      {/* Header */}
      <header className="relative z-20 mx-4 my-2 rounded-full border-b border-white/10 bg-white/10 md:mx-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90">
              <span className="font-playfair text-xl font-semibold text-blue-600">
                N
              </span>
            </div>
            <span className="font-playfair text-2xl font-semibold tracking-tight text-white">
              Nova
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-inter text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Header CTA */}
          <div className="flex items-center gap-4">
            <button className="hidden font-inter text-sm font-medium text-white/80 transition-colors hover:text-white md:block">
              Sign In
            </button>
            <button className="rounded-full bg-white px-6 py-2.5 font-inter text-sm font-medium text-gray-900 transition-all hover:bg-white/90 hover:shadow-lg">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="font-inter text-sm font-medium text-white/90">
            Now Available
          </span>
        </div>

        <h1 className="mb-6 font-playfair text-6xl font-light tracking-tight text-white md:text-7xl lg:text-8xl">
          Discover Your
          <br />
          <span className="font-medium">Inner Peace</span>
        </h1>

        <p className="mb-12 max-w-2xl font-inter text-lg font-light leading-relaxed text-white/90 md:text-xl">
          Experience the perfect blend of tranquility and innovation. Nova
          brings you closer to nature's harmony, one moment at a time.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="group rounded-full bg-white px-8 py-4 font-inter text-sm font-semibold uppercase tracking-wider text-gray-900 shadow-xl transition-all hover:scale-105 hover:bg-white/95 hover:shadow-2xl">
            Start Your Journey
          </button>
          <button className="group relative overflow-hidden rounded-full border border-white/30 bg-white/15 px-8 py-4 font-inter text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/50 hover:bg-white/20">
            <span className="relative z-10">Learn More</span>
            <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="font-inter text-xs uppercase tracking-widest text-white/60">
            Scroll
          </span>
          <div className="h-12 w-0.5 bg-linear-to-b from-white/60 via-white/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
