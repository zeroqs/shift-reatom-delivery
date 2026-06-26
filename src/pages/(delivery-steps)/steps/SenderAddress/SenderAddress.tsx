import { Button, Textarea, TextInput } from '@mantine/core';
import { bindField, reatomComponent } from '@reatom/react';

import { goBackStep } from '../../model';
import { senderAddressForm } from './model';

import styles from '../styles.module.css';

export const SenderAddress = reatomComponent(() => {
  const streetField = bindField(senderAddressForm.fields.street);
  const houseField = bindField(senderAddressForm.fields.house);
  const apartmentField = bindField(senderAddressForm.fields.apartment);
  const commentField = bindField(senderAddressForm.fields.comment);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        senderAddressForm.submit();
      }}
    >
      <div className={styles.fields}>
        <TextInput label='Улица' size='md' {...streetField} error={streetField.error} />
        <div className={styles.inlineFields}>
          <TextInput label='Дом' size='md' {...houseField} error={houseField.error} />
          <TextInput label='Квартира' size='md' {...apartmentField} />
        </div>
        <Textarea autosize label='Заметка для курьера' minRows={3} size='md' {...commentField} />
      </div>

      <div className={styles.actions}>
        <Button fullWidth size='lg' type='button' variant='light' onClick={goBackStep}>
          Назад
        </Button>
        <Button fullWidth loading={!senderAddressForm.submit.ready()} size='lg' type='submit'>
          Продолжить
        </Button>
      </div>
    </form>
  );
});
