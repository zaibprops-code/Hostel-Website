import type { IconName } from "@/types";

/**
 * A single, dependency-free line-icon set drawn on a 24×24 grid.
 * Consistent stroke weight keeps the facilities and feature grids feeling
 * like one considered system rather than a pile of clip-art.
 */
const paths: Record<IconName, React.ReactNode> = {
  wifi: (
    <>
      <path d="M2 8.5a15 15 0 0 1 20 0" />
      <path d="M5 12a10 10 0 0 1 14 0" />
      <path d="M8.5 15.5a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  cctv: (
    <>
      <path d="M3 7l14-2 1.2 4L4 11.5 3 7z" />
      <path d="M4 11.5 3.2 15" />
      <path d="M17.2 7.5 21 6.4" />
      <path d="M11 15v3H8" />
      <circle cx="7" cy="8.4" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  laundry: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M9.6 11.5c1.4 1 3.4 1 4.8 0" />
      <circle cx="8" cy="6" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="6" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  kitchen: (
    <>
      <path d="M6 3v6a2 2 0 0 0 2 2h0v10" />
      <path d="M6 3v4M8 3v4" />
      <path d="M16 3c-1.7 0-3 2-3 4.5S14.3 12 16 12v9" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
      <path d="M6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2" />
      <path d="M9 8h2" />
      <path d="M7 19l-1 2M17 19l1 2" />
    </>
  ),
  housekeeping: (
    <>
      <path d="M15 3l3 3-8 8H7v-3l8-8z" />
      <path d="M4 21c1.5-2 3-3 5-3" />
      <path d="M12.5 5.5l3 3" />
    </>
  ),
  water: (
    <>
      <path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  power: (
    <>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </>
  ),
  parking: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </>
  ),
  study: (
    <>
      <path d="M3 5h8a2 2 0 0 1 2 2v12a3 3 0 0 0-3-3H3V5z" />
      <path d="M21 5h-8a2 2 0 0 0-2 2v12a3 3 0 0 1 3-3h7V5z" />
    </>
  ),
  lounge: (
    <>
      <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
      <path d="M3 11a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2" />
      <path d="M5 16v3M19 16v3" />
    </>
  ),
  prayer: (
    <>
      <path d="M12 3a5 5 0 0 1 5 5v9H7V8a5 5 0 0 1 5-5z" />
      <path d="M5 21h14" />
      <path d="M12 8v4" />
    </>
  ),
  ac: (
    <>
      <rect x="3" y="4" width="18" height="8" rx="2" />
      <path d="M6 8h9" />
      <path d="M7 16c0 1 1 1.5 1 2.5M12 16c0 1 1 1.5 1 2.5M17 16c0 1 1 1.5 1 2.5" />
    </>
  ),
  heating: (
    <>
      <path d="M8 3c1.2 1.5 1.2 3 0 4.5S6.8 10.5 8 12" />
      <path d="M12 3c1.2 1.5 1.2 3 0 4.5S10.8 10.5 12 12" />
      <path d="M16 3c1.2 1.5 1.2 3 0 4.5S14.8 10.5 16 12" />
      <path d="M5 16h14" />
      <path d="M7 16v5M17 16v5" />
    </>
  ),
  bed: (
    <>
      <path d="M3 8v10M3 12h18v6" />
      <path d="M21 18v-4a2 2 0 0 0-2-2H10V8a1 1 0 0 0-1-1H5a2 2 0 0 0-2 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M18 15c2 .6 3 2.3 3 5" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <>
      <path d="M4 5c0-1 1-2 2-2h2l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v2c0 1-1 2-2 2A16 16 0 0 1 4 5z" />
    </>
  ),
  // Authentic WhatsApp glyph — rendered as a filled shape (overrides the
  // set's default stroke styling) so it matches the official logo.
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="m5 12 4 4 10-10" />,
  star: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
      <path d="M5 19c3-5 6-8 11-10" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z" />
      <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 3c-.5.8-.5 1.5 0 2.3M12 3c-.5.8-.5 1.5 0 2.3" />
    </>
  ),
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
