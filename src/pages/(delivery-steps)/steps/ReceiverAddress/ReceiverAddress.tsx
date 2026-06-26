import {
  ActionIcon,
  Button,
  Checkbox,
  Popover,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { bindField, reatomComponent } from '@reatom/react';
import { CircleQuestionMark } from 'lucide-react';

import { goBackStep } from '../../model';
import { receiverAddressForm } from './model';

import styles from '../styles.module.css';

export const ReceiverAddress = reatomComponent(() => {
  const streetField = bindField(receiverAddressForm.fields.street);
  const houseField = bindField(receiverAddressForm.fields.house);
  const apartmentField = bindField(receiverAddressForm.fields.apartment);
  const commentField = bindField(receiverAddressForm.fields.comment);
  const isNonContact = receiverAddressForm.fields.isNonContact;

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        receiverAddressForm.submit();
      }}
    >
      <div className={styles.fields}>
        <TextInput label='Улица' size='md' {...streetField} error={streetField.error} />
        <div className={styles.inlineFields}>
          <TextInput label='Дом' size='md' {...houseField} error={houseField.error} />
          <TextInput label='Квартира' size='md' {...apartmentField} />
        </div>
        <Textarea autosize label='Заметка для курьера' minRows={3} size='md' {...commentField} />

        <div className={styles.checkboxRow}>
          <Checkbox
            checked={isNonContact()}
            label='Оставить заказ у двери'
            onChange={(e) => isNonContact.set(e.currentTarget.checked)}
          />
          <Popover position='bottom-start' shadow='md' width={320} withArrow>
            <Popover.Target>
              <ActionIcon
                aria-label='Подробнее о бесконтактной доставке'
                className={styles.helpButton}
                size='sm'
                variant='transparent'
              >
                <CircleQuestionMark size={18} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <div className={styles.popoverContent}>
                <Title order={5}>Бесконтактная доставка</Title>
                <Text size='sm'>
                  Курьер привозит заказ, оставляет его у двери и уходит, а вам приходит уведомление
                  на телефон о том, что заказ доставлен.
                </Text>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>

      <div className={styles.actions}>
        <Button fullWidth size='lg' type='button' variant='light' onClick={goBackStep}>
          Назад
        </Button>
        <Button fullWidth loading={!receiverAddressForm.submit.ready()} size='lg' type='submit'>
          Продолжить
        </Button>
      </div>
    </form>
  );
});
