import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ hover = false, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`bg-bg-secondary rounded-xl border border-bg-tertiary p-4 ${
        hover ? "hover:border-accent-amber/30 transition-colors cursor-pointer" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
