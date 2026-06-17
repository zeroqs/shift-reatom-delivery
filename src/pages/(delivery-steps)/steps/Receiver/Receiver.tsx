import { Button, TextInput } from '@mantine/core';

import styles from './styles.module.css';

export const Receiver = () => (
  <form className={styles.form}>
    <div className={styles.fields}>
      <TextInput label='Фамилия' size='md' />
      <TextInput label='Имя' size='md' />
      <TextInput label='Отчество' size='md' />
      <TextInput label='Телефон' size='md' type='tel' />
    </div>

    <div className={styles.actions}>
      <Button fullWidth size='lg' variant='light'>
        Назад
      </Button>
      <Button fullWidth size='lg'>
        Продолжить
      </Button>
    </div>
  </form>
);
