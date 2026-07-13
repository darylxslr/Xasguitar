import { HTMLAttributes } from "react";

type BadgeVariant = "starter" | "beginner" | "intermediate" | "advanced" | "default";

const badgeStyles: Record<BadgeVariant, string> = {
  starter: "bg-difficulty-starter/10 text-difficulty-starter border-difficulty-starter/20",
  beginner: "bg-difficulty-beginner/10 text-difficulty-beginner border-difficulty-beginner/20",
  intermediate: "bg-difficulty-intermediate/10 text-difficulty-intermediate border-difficulty-intermediate/20",
  advanced: "bg-difficulty-advanced/10 text-difficulty-advanced border-difficulty-advanced/20",
  default: "bg-bg-tertiary text-text-secondary border-bg-tertiary",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export default function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
