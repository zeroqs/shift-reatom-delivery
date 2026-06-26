import { Button, TextInput } from '@mantine/core';
import { bindField, reatomComponent } from '@reatom/react';

import { PhoneMaskInput } from '@/shared';

import { goBackStep } from '../../model';
import { senderForm } from './model';

import styles from '../styles.module.css';

export const Sender = reatomComponent(() => {
  const lastNameField = bindField(senderForm.fields.lastname);
  const firstNameField = bindField(senderForm.fields.firstname);
  const middleNameField = bindField(senderForm.fields.middlename);
  const phoneField = bindField(senderForm.fields.phone);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        senderForm.submit();
      }}
    >
      <div className={styles.fields}>
        <TextInput label='Фамилия' size='md' {...lastNameField} error={lastNameField.error} />
        <TextInput label='Имя' size='md' {...firstNameField} error={firstNameField.error} />
        <TextInput label='Отчество' size='md' {...middleNameField} error={middleNameField.error} />
        <PhoneMaskInput field={phoneField} label='Телефон' size='md' />
      </div>

      <div className={styles.actions}>
        <Button fullWidth size='lg' type='button' variant='light' onClick={goBackStep}>
          Назад
        </Button>
        <Button fullWidth loading={!senderForm.submit.ready()} size='lg' type='submit'>
          Продолжить
        </Button>
      </div>
    </form>
  );
});
