import React, { type ReactNode } from "react";

export interface GradientTextProps {
  text?: string;
  children?: ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  children,
  className = "",
}) => {
  const content = text || children || "Gradient Text";

  return (
    <span
      className={`bg-linear-to-b from-black via-black to-primary bg-clip-text text-transparent ${className}`}
    >
      {content}
    </span>
  );
};

export default GradientText;
