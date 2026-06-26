import { Button, Text, Title } from '@mantine/core';

import styles from './styles.module.css';

interface Props {
  onRetry: () => void;
}

export const ErrorPage = ({ onRetry }: Props) => (
  <div className={styles.root}>
    <Title fw={700} order={3}>
      Что-то пошло не так
    </Title>
    <Text c='#969696' fw={500} fz={16}>
      Не удалось загрузить данные. Попробуйте ещё раз.
    </Text>
    <Button size='md' onClick={onRetry}>
      Повторить запрос
    </Button>
  </div>
);
