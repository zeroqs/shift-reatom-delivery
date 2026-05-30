import { Button, TextInput, Title } from '@mantine/core';
import { bindField, reatomComponent } from '@reatom/react';

import type { ProfileForm } from './model';

import styles from './styles.module.css';

interface ProfileFormModel {
  form: ProfileForm;
}

interface Props {
  model: ProfileFormModel;
}

export const Profile = reatomComponent(({ model }: Props) => {
  const { form } = model;
  return (
    <div className={styles.profile}>
      <Title order={2}>Профиль</Title>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          form.submit();
        }}
      >
        <div className={styles.column}>
          <TextInput {...bindField(form.fields.lastname)} label='Фамилия' size='md' />
          <TextInput {...bindField(form.fields.firstname)} label='Имя' size='md' />
          <TextInput {...bindField(form.fields.middlename)} label='Отчество' size='md' />
          <Button
            fullWidth
            className={styles.submit}
            disabled={!form.focus().dirty}
            fw={400}
            fz={14}
            loading={!form.submit.ready()}
            size='lg'
            type='submit'
          >
            Обновить данные
          </Button>
        </div>
        <div className={styles.column}>
          <TextInput {...bindField(form.fields.phone)} label='Телефон' size='md' />
          <TextInput {...bindField(form.fields.email)} label='Email' size='md' />
          <TextInput {...bindField(form.fields.city)} label='Город' size='md' />
        </div>
      </form>
    </div>
  );
});
