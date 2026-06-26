import type {
  CSSVariablesResolver,
  MantineColorsTuple,
  VariantColorsResolver
} from '@mantine/core';

import { createTheme, defaultVariantColorsResolver } from '@mantine/core';

const colors: MantineColorsTuple = [
  '#f5f5f5',
  '#e7e7e7',
  '#cdcdcd',
  '#b2b2b2',
  '#9a9a9a',
  '#8b8b8b',
  '#0b0b0b',
  '#717171',
  '#656565',
  '#0b0b0b'
];

const STATUS_BADGE_COLORS: Record<string, string> = {
  'status-created': '#fef08a',
  'status-waiting': '#fde68a',
  'status-transit': '#bfdbfe',
  'status-delivered': '#bbf7d0',
  'status-canceled': '#fecaca'
};

const variantColorResolver: VariantColorsResolver = (input) => {
  const statusColor = STATUS_BADGE_COLORS[input.variant];

  if (statusColor) {
    return {
      background: statusColor,
      hover: statusColor,
      color: 'var(--mantine-color-black)',
      border: 'none'
    };
  }

  return defaultVariantColorsResolver(input);
};

export const theme = createTheme({
  colors: {
    custom: colors
  },
  variantColorResolver,
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '23rem',
    xl: '3rem'
  },
  fontFamily: 'Nunito, sans-serif',
  primaryColor: 'custom',

  headings: {
    fontWeight: '400',

    sizes: {
      h1: {
        fontWeight: '100'
      },
      h2: {
        fontWeight: '700'
      },
      h3: { fontWeight: '800' }
    }
  }
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    '--mantine-color-anchor': 'var(--mantine-color-gray-6)'
  },
  dark: {
    '--mantine-color-anchor': 'var(--mantine-color-gray-4)'
  }
});
