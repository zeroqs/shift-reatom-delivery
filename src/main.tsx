import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';

import { App } from './app/App.tsx';
import { theme } from './theme.ts';

import '@mantine/core/styles.css';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
