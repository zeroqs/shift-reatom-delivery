import { getApiUsersSession } from '@api';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { createRoot } from 'react-dom/client';

import { App } from './app/App.tsx';
import { tokenAtom, userAtom } from './app/user.model.ts';
import { theme } from './theme.ts';

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import './styles.css';

const init = async () => {
  const token = tokenAtom();
  if (!token) userAtom.set(null);

  try {
    const session = await getApiUsersSession({ headers: { authorization: `Bearer ${token}` } });
    userAtom.set(session.data.user);
  } catch {
    tokenAtom.set(null);
    userAtom.set(null);
  }

  createRoot(document.getElementById('root')!).render(
    <MantineProvider theme={theme}>
      <Notifications position='top-right' />
      <App />
    </MantineProvider>
  );
};

init();
