import { Button, Paper, Title, Typography } from '@mantine/core';
import { bindField, reatomComponent } from '@reatom/react';

import { router } from '@/app/router';
import { Delivery, PhoneMaskInput } from '@/shared';

import type { LoginPhoneForm } from '../model';

import styles from './styles.module.css';

interface LoginPhoneModel {
  form: LoginPhoneForm;
}

interface Props {
  model: LoginPhoneModel;
}

export const Phone = reatomComponent(({ model }: Props) => {
  const { form } = model;
  const phoneField = bindField(form.fields.phone);

  return (
    <main className={styles.root}>
      <Delivery />
      <div className={styles.auth}>
        <Title className={styles.title} order={2}>
          Авторизация
        </Title>
        <Typography>Введите номер телефона для входа в свой профиль</Typography>
        <Paper
          component='form'
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            form.submit().then((response) => {
              if (response.success) router.loginConfirm.go();
            });
          }}
        >
          <PhoneMaskInput field={phoneField} label='Телефон' size='md' w='100%' />
          <Button fullWidth fz={14} loading={!form.submit.ready()} mt={16} size='lg' type='submit'>
            Войти
          </Button>
        </Paper>
      </div>
    </main>
  );
});
