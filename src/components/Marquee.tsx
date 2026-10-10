import React from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiTailwindcss,
  SiVuedotjs,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiMongodb,
  SiPython,
  SiPrisma,
} from "react-icons/si";

const logos1: { id: number; name: string; icon: IconType }[] = [
  { id: 1, name: "React", icon: SiReact },
  { id: 2, name: "TypeScript", icon: SiTypescript },
  { id: 3, name: "Tailwind CSS", icon: SiTailwindcss },
  { id: 4, name: "Vue", icon: SiVuedotjs },
  { id: 5, name: "JavaScript", icon: SiJavascript },
  { id: 6, name: "Next.js", icon: SiNextdotjs },
  { id: 7, name: "Python", icon: SiPython },
  { id: 8, name: "Prisma", icon: SiPrisma },
  { id: 9, name: "MySQL", icon: SiMysql },
  { id: 10, name: "MongoDB", icon: SiMongodb },
];

const SPEED = "20s";

function Logomarquee() {
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes marquee-move {
        to { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
      }}
    >
      {/* The track moves, not the items. Two copies, so -50% loops seamlessly. */}
      <div
        className="flex w-max"
        style={{ animation: `marquee-move ${SPEED} linear infinite` }}
      >
        {[...logos1, ...logos1].map(({ name, icon: Icon }, index) => (
          <div
            key={index}
            title={name}
            className="mx-1 flex size-14 shrink-0 items-center justify-center rounded-2xl "
          >
            {/* No text color set, so the icon inherits from the parent */}
            <Icon className="size-3/5" aria-label={name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Logomarquee;
