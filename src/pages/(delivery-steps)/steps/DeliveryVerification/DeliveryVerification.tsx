import { Button, Divider, Text, Title } from '@mantine/core';
import { reatomComponent } from '@reatom/react';

import { goBackStep, goToDeliveryStep, orderInfoAtom } from '../../model';
import { selectedDeliveryOptionAtom } from '../DeliveryType/model';
import { createOrder } from './model';

import styles from './styles.module.css';

const priceFormatter = new Intl.NumberFormat('ru-RU');

export const DeliveryVerification = reatomComponent(() => {
  const items = orderInfoAtom();
  const left = items.slice(0, 3);
  const right = items.slice(3);
  const price = selectedDeliveryOptionAtom()?.price;

  return (
    <div className={styles.container}>
      <Title fw={700} order={3}>
        Ваш заказ
      </Title>

      <div className={styles.rows}>
        <div className={styles.column}>
          {left.map(({ title, text }) => (
            <div key={title} className={styles.row}>
              <Text c='#969696' fw={500} fz={14}>
                {title}
              </Text>
              <Text fz={18}>{text}</Text>
            </div>
          ))}
        </div>

        <div className={styles.column}>
          {right.map(({ title, text }) => (
            <div key={title} className={styles.row}>
              <Text c='#969696' fw={500} fz={14}>
                {title}
              </Text>
              <Text fz={18}>{text}</Text>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {price !== undefined && (
        <div className={styles.total}>
          <Title fw={700} order={2}>
            Итого:
          </Title>
          <Title fw={700} order={2}>
            {priceFormatter.format(price)}₽
          </Title>
        </div>
      )}

      <Button fullWidth size='lg' variant='light' onClick={() => goToDeliveryStep('receiver')}>
        Редактировать данные
      </Button>

      <div className={styles.actions}>
        <Button fullWidth size='lg' type='button' variant='light' onClick={goBackStep}>
          Назад
        </Button>
        <Button
          fullWidth
          loading={!createOrder.ready()}
          size='lg'
          type='button'
          onClick={createOrder}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
});
