import { ActionIcon, Button, Container } from '@mantine/core';
import { History, LogIn, User } from 'lucide-react';

import { router } from '@/app/router';
import { logout } from '@/app/user.model';
import { Delivery } from '@/shared';

import styles from './styles.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <Container pt={20} size='lg'>
    <header className={styles.header}>
      <Delivery />
      <div className={styles.actions}>
        <ActionIcon className={styles.action} size='input-md' variant='light'>
          <History />
        </ActionIcon>
        <ActionIcon
          className={styles.action}
          size='input-md'
          variant='light'
          onClick={() => router.profile.go()}
        >
          <User />
        </ActionIcon>
        <Button className={styles.action} rightSection={<LogIn />} size='md' onClick={logout}>
          Выйти
        </Button>
      </div>
    </header>
    {children}
  </Container>
);
