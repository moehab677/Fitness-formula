// Theme = reference design tokens (src/styles/tokens.css). Every scale is replaced (not
// extended) so values outside the token set cannot be expressed; all values resolve to
// the custom properties declared in src/styles/tokens.css.
const color = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

// 4 px spacing grid (constitution v3.0.0): key n = n × 4 px, plus the named aliases.
const grid = Object.fromEntries(Array.from({ length: 40 }, (_, i) => [i + 1, `${(i + 1) * 4}px`]))

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: color('bg'),
      card: color('card'),
      elevated: color('elevated'),
      hairline: color('hairline'),
      'hairline-2': color('hairline-2'),
      accent: color('accent'),
      'accent-hover': color('accent-hover'),
      ink: color('ink'),
      muted: color('muted'),
      dim: color('dim'),
      'on-accent': color('on-accent'),
      danger: color('danger'),
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
      section: 'var(--section-pad)',
      pad: 'var(--pad)',
    },
    fontFamily: {
      sans: 'var(--font-body)',
      display: 'var(--font-display)',
      label: 'var(--font-label)',
    },
    fontSize: {},
    borderRadius: { none: '0', full: '9999px' },
    boxShadow: { none: 'none' },
    backgroundImage: { none: 'none' },
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
