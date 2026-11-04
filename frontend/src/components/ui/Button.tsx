import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-xl font-semibold
    transition-all duration-200
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-orange-400
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  const variants = {
    primary: `
      bg-orange-500 text-white
      hover:bg-orange-400
      active:scale-[0.98]
    `,

    secondary: `
      border border-white/20
      bg-white/10 text-white
      hover:border-orange-400
      hover:bg-orange-500/10
      hover:text-orange-300
    `,

    ghost: `
      text-white/70
      hover:bg-white/10
      hover:text-white
    `,

    danger: `
      border border-red-400/20
      bg-red-500 text-white
      hover:bg-red-400
    `,
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;