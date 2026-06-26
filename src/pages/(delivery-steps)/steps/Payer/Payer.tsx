import { Button, Radio } from '@mantine/core';
import { reatomComponent } from '@reatom/react';

import { goBackStep } from '../../model';
import { payerForm } from './model';

import styles from '../styles.module.css';

export const Payer = reatomComponent(() => {
  const payerField = payerForm.fields.payer;

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        payerForm.submit();
      }}
    >
      <Radio.Group
        label='Кто оплачивает доставку?'
        value={payerField()}
        onChange={(value) => payerField.set(value as 'receiver' | 'sender')}
      >
        <div className={styles.radioGroup}>
          <Radio label='Получатель' value='receiver' />
          <Radio label='Отправитель' value='sender' />
        </div>
      </Radio.Group>

      <div className={styles.actions}>
        <Button fullWidth size='lg' type='button' variant='light' onClick={goBackStep}>
          Назад
        </Button>
        <Button fullWidth loading={!payerForm.submit.ready()} size='lg' type='submit'>
          Продолжить
        </Button>
      </div>
    </form>
  );
});
