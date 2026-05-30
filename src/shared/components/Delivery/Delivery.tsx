import { Title } from '@mantine/core';

import { router } from '@/app/router';
import { DeliveryIcon } from '@/shared';

import styles from './styles.module.css';

export const Delivery = () => (
  <section className={styles.root} onClick={() => router.home.go()}>
    <DeliveryIcon />
    <Title className={styles.title} order={3}>
      Delivery
    </Title>
  </section>
);
