import { Title } from '@mantine/core';

import styles from './styles.module.css';

export const OrderInfo = () => (
  <div className={styles.container}>
    <Title fw={700} order={3}>
      Ваш заказ
    </Title>
  </div>
);
