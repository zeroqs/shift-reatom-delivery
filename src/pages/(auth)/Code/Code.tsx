import { ActionIcon, Button, Paper, PinInput, Title, Typography } from '@mantine/core';
import { bindField, reatomComponent } from '@reatom/react';
import { ChevronLeft } from 'lucide-react';

import { router } from '@/app/router';
import { Delivery } from '@/shared';

import type { LoginForm } from '../model';

import { otpRetryTmer, phoneForm } from '../model';

import styles from './styles.module.css';

interface LoginCodeModel {
  form: LoginForm;
}

interface Props {
  model: LoginCodeModel;
}

export const Code = reatomComponent(({ model }: Props) => {
  const otpRetrySeconds = otpRetryTmer.remainingSecondsAtom();
  const isOtpRetryActive = otpRetrySeconds !== null;

  const { form } = model;
  const codeField = bindField(form.fields.code);

  return (
    <main className={styles.root}>
      <Delivery />
      <div className={styles.auth}>
        <div className={styles.titleContainer}>
          <ActionIcon variant='transparent' onClick={() => router.login.go()}>
            <ChevronLeft />
          </ActionIcon>
          <Title className={styles.title} order={2}>
            Проверочный код
          </Title>
        </div>
        <Typography>На указанный вами номер был отправлен проверочный код</Typography>

        <Paper
          className={styles.paper}
          component='form'
          onSubmit={(e) => {
            e.preventDefault();
            form.submit();
          }}
        >
          <Typography>Проверочный код</Typography>
          <PinInput
            error={Boolean(codeField.error)}
            length={6}
            size='md'
            type='number'
            value={codeField.value}
            w='100%'
            onBlur={codeField.onBlur}
            onChange={codeField.onChange}
            onFocus={codeField.onFocus}
          />
          <Button fullWidth fz={14} mt={8} size='lg' type='submit'>
            Войти
          </Button>
          <Button
            fullWidth
            disabled={isOtpRetryActive}
            fz={14}
            loading={!phoneForm.submit.ready()}
            size='lg'
            variant='light'
            onClick={() => phoneForm.submit()}
          >
            {!isOtpRetryActive && 'Отправить код повторно'}
            {isOtpRetryActive && `Отправить код повторно через ${otpRetrySeconds} сек`}
          </Button>
        </Paper>
      </div>
    </main>
  );
});
