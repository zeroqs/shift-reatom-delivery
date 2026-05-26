import { Button, MaskInput, Paper, Title, Typography } from '@mantine/core';
import { formatMask } from '@mantine/hooks';
import { bindField, reatomComponent } from '@reatom/react';

import { router } from '@/app/router';
import { Delivery } from '@/shared';

import type { LoginPhoneForm } from '../model';

import styles from './styles.module.css';

const PHONE_MASK = '+7 (999) 999-99-99';

interface LoginPhoneModel {
  form: LoginPhoneForm;
}

interface Props {
  model: LoginPhoneModel;
}

export const Phone = reatomComponent(({ model }: Props) => {
  const { form } = model;
  const phoneField = bindField(form.fields.phone);
  const phoneInputDefaultValue = phoneField.value
    ? formatMask(phoneField.value.replace(/^7/, ''), { mask: PHONE_MASK })
    : '';

  // Syncs the mask input value with the default value on mount
  const syncMaskInputRef = (node: HTMLInputElement | null) => {
    if (!node || !phoneInputDefaultValue) return;

    queueMicrotask(() => {
      node.value = phoneInputDefaultValue;
      node.dispatchEvent(new Event('input', { bubbles: true }));
    });
  };

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
          <MaskInput
            ref={syncMaskInputRef}
            defaultValue={phoneInputDefaultValue}
            error={phoneField.error}
            label='Телефон'
            mask={PHONE_MASK}
            placeholder='+7'
            size='md'
            w='100%'
            onBlur={phoneField.onBlur}
            onChangeRaw={(rawValue) => {
              phoneField.onChange(rawValue ? `7${rawValue}` : '');
            }}
            onFocus={phoneField.onFocus}
          />
          <Button fullWidth fz={14} loading={!form.submit.ready()} mt={16} size='lg' type='submit'>
            Войти
          </Button>
        </Paper>
      </div>
    </main>
  );
});
