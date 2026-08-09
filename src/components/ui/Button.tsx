import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "brass";
type Size = "sm" | "md" | "lg";

const base =
  "btn-sheen-host relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] motion-reduce:transform-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest-700 text-ivory hover:bg-forest-800 shadow-sm hover:shadow-md",
  brass:
    "bg-brass-400 text-forest-900 hover:bg-brass-300 shadow-sm hover:shadow-md",
  secondary:
    "border border-forest-700/25 bg-transparent text-forest-800 hover:border-forest-700/60 hover:bg-forest-700/5",
  ghost: "text-forest-800 hover:bg-forest-700/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  // A light sweep on hover for the solid, high-emphasis buttons.
  const sheen = variant === "primary" || variant === "brass";
  const content = (
    <>
      {sheen && <span className="btn-sheen" aria-hidden />}
      {children}
    </>
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
