import type { ReactNode } from 'react'

// Inline icons taken from the approved landing-page design (constitution v3.0.0): 24px grid,
// 1.8 stroke, round caps. Inline SVG keeps icons free of third-party font requests.
const icons = {
  dumbbell: <path d="M6 7v10M3 9.5v5M18 7v10M21 9.5v5M6 12h12" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-back': <path d="M19 12H5M11 6l-6 6 6 6" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  spark: <path d="M12 2l2.5 7.5H22l-6 4.5 2.3 7.5L12 17l-6.3 4.5L8 14 2 9.5h7.5z" />,
  quote: <path d="M4 11h5v8H4zM4 11c0-4 1.5-6 5-7M15 11h5v8h-5zM15 11c0-4 1.5-6 5-7" />,
  baseline: (
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4" />
  ),
  variables: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  refresh: <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />,
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  ),
  branch: (
    <path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9" />
  ),
  video: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="3" />
      <path d="m16 10 6-3v10l-6-3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
  star: <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" />,
  block: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  warn: (
    <>
      <path d="M12 3 22 20H2z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  map: <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14" />,
  trophy: (
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-4.5-4.5L6 21" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M21 12a8.5 8.5 0 0 1-12.6 7.5L3 21l1.5-5.2A8.5 8.5 0 1 1 21 12z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-.8-.4-1.4-1-1.8-1.8l.8-1-1-2z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  pause: <path d="M9 6v12M15 6v12" />,
  play: <path d="m8 5 11 7-11 7z" />,
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof icons

// Icons that point along the reading direction flip in RTL.
const directional: ReadonlySet<IconName> = new Set(['arrow', 'arrow-back'])

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[1em] w-[1em] shrink-0 ${directional.has(name) ? 'rtl:-scale-x-100' : ''} ${className}`}
    >
      {icons[name]}
    </svg>
  )
}
