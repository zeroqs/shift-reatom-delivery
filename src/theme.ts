import type { MantineColorsTuple } from '@mantine/core';

import { createTheme } from '@mantine/core';

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

export const theme = createTheme({
  colors: {
    custom: colors
  },
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
