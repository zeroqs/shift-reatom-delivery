import { Title } from '@mantine/core';

import { DeliveryIcon } from '@/shared';

import styles from './styles.module.css';

export const Delivery = () => (
  <section className={styles.root}>
    <DeliveryIcon />
    <Title className={styles.title} order={3}>
      Delivery
    </Title>
  </section>
);
