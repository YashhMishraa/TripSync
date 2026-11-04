import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "glass" | "subtle" | "solid";
  padding?: "none" | "sm" | "md" | "lg";
};

function Card({
  children,
  variant = "glass",
  padding = "md",
  className = "",
  ...props
}: CardProps) {

  const variants = {
    glass: `
      border border-white/15
      bg-white/10
      backdrop-blur-xl
    `,

    subtle: `
      border border-white/10
      bg-white/5
    `,

    solid: `
      border border-white/10
      bg-[#173B3B]
    `,
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  return (
    <div
      className={`
        rounded-2xl
        ${variants[variant]}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;