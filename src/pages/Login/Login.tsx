import { Button, MaskInput, Title, Typography } from '@mantine/core';

import { Delivery } from '@/shared';

import styles from './styles.module.css';

export const Login = () => (
  <main className={styles.root}>
    <Delivery />
    <div className={styles.auth}>
      <Title className={styles.title} order={2}>
        Авторизация
      </Title>
      <Typography>Введите номер телефона для входа в свой профиль</Typography>
      <MaskInput label='Телефон' mask='+7 (999) 999-99-99' placeholder='+7' w='100%' />
      <Button fullWidth mt={8} size='lg'>
        Войти
      </Button>
    </div>
  </main>
);
