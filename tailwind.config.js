// Theme = constitution v3.0.0 "Design System Tokens". Every scale is replaced (not
// extended) so values outside the token set cannot be expressed; all values resolve to
// the custom properties declared in src/styles/tokens.css.
const color = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

const role = (name, { tracking = false } = {}) => [
  `var(--fs-${name})`,
  {
    lineHeight: `var(--lh-${name})`,
    fontWeight: `var(--fw-${name}, var(--fw-body))`,
    ...(tracking ? { letterSpacing: `var(--ls-${name}, 0)` } : {}),
  },
]

// 4 px spacing grid (constitution v3.0.0): key n = n × 4 px, plus the named aliases.
const grid = Object.fromEntries(Array.from({ length: 40 }, (_, i) => [i + 1, `${(i + 1) * 4}px`]))

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: color('bg'),
      'bg-2': color('bg-2'),
      card: color('card'),
      'card-2': color('card-2'),
      line: 'var(--line)',
      'line-2': 'var(--line-2)',
      accent: color('accent'),
      'accent-2': color('accent-2'),
      ink: color('ink'),
      text: color('text'),
      muted: color('muted'),
      dim: color('dim'),
      'on-accent': color('on-accent'),
      warn: color('warn'),
    },
    screens: { md: '721px', lg: '1100px', '2xl': '1440px' },
    spacing: {
      0: '0',
      px: '1px',
      ...grid,
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '40px',
      '2xl': '80px',
      '3xl': '120px',
      header: 'var(--header-h)',
      target: '44px',
      section: 'var(--section-gap)',
      pad: 'var(--pad)',
    },
    fontFamily: {
      sans: 'var(--font-body)',
      display: 'var(--font-display)',
      label: 'var(--font-label)',
    },
    fontSize: {
      display: role('display', { tracking: true }),
      'headline-xl': role('headline-xl', { tracking: true }),
      'headline-lg': role('headline-lg', { tracking: true }),
      'headline-md': role('headline-md'),
      'headline-sm': role('headline-sm'),
      metric: role('metric', { tracking: true }),
      'metric-sm': role('metric-sm'),
      'body-lg': role('body-lg'),
      'body-md': role('body-md'),
      'body-card': role('body-card'),
      'body-sm': role('body-sm'),
      'label-lg': role('label-lg', { tracking: true }),
      'label-md': role('label-md', { tracking: true }),
      'label-sm': role('label-sm', { tracking: true }),
    },
    borderRadius: {
      none: '0',
      xs: '10px',
      sm: '14px',
      md: '20px',
      lg: '28px',
      xl: '36px',
      '2xl': '44px',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
      card: 'var(--shadow-card)',
      'card-hover': 'var(--shadow-card-hover)',
      glow: 'var(--shadow-glow)',
      'glow-hover': 'var(--shadow-glow-hover)',
      tile: 'var(--shadow-tile)',
      pop: 'var(--shadow-pop)',
    },
    backgroundImage: {
      none: 'none',
      'accent-fill':
        'linear-gradient(180deg, rgb(var(--color-accent-2)), rgb(var(--color-accent)))',
      'accent-tile':
        'linear-gradient(145deg, rgb(var(--color-accent) / 0.18), rgb(var(--color-accent) / 0.04))',
      surface: 'linear-gradient(180deg, rgb(var(--color-card-2)), rgb(var(--color-card)))',
    },
    maxWidth: {
      none: 'none',
      full: '100%',
      canvas: 'var(--canvas)',
      prose: '620px',
      head: '860px',
      content: '1040px',
    },
    extend: {
      height: { 'photo-sm': '360px', 'photo-md': '420px' },
      transitionTimingFunction: { reveal: 'cubic-bezier(.2,.7,.2,1)' },
      transitionDuration: { micro: '100ms', hover: '350ms', lift: '500ms' },
    },
  },
  plugins: [],
}
