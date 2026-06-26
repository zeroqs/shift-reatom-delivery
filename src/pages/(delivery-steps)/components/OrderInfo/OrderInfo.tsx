import { Text, Title } from '@mantine/core';
import { reatomComponent } from '@reatom/react';

import { currentStepTitleAtom, orderInfoAtom } from '../../model';

import styles from './styles.module.css';

export const OrderInfo = reatomComponent(() => (
  <div className={styles.container}>
    <Title fw={700} order={3}>
      Ваш заказ
    </Title>
    {orderInfoAtom().map(({ title, text }) => (
      <div key={title}>
        <Text c='#969696' fz={14}>
          {title}
        </Text>
        <Text fw={400} fz={18}>
          {text}
        </Text>
      </div>
    ))}
    <div>
      <Text c='#969696' fz={14}>
        {currentStepTitleAtom()}
      </Text>
      <Text fw={400} fz={18}>
        Заполните поля
      </Text>
    </div>
  </div>
));
