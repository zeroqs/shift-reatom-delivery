import type { DeliveryOrder } from '@api';

import { ActionIcon, Button, Text, Title } from '@mantine/core';
import { reatomComponent } from '@reatom/react';
import { ChevronLeft } from 'lucide-react';

import { router } from '@/app/router';
import { DeliveryStatusStepper, formatDeliveryAddress } from '@/shared';

import { cancelOrder, formatPerson, getOptionLabel, getPayerLabel, STATUS_LABEL } from './model';

import styles from './styles.module.css';

interface OrderModel {
  order: DeliveryOrder | null;
}

interface Props {
  model: OrderModel;
  onRefetch: () => void;
}

export const Order = reatomComponent(({ model, onRefetch }: Props) => {
  const { order } = model;

  if (!order)
    return (
      <Text c='#969696' fw={500} fz={16}>
        Заказ не найден
      </Text>
    );

  return (
    <div className={styles.order}>
      <div className={styles.titleRow}>
        <ActionIcon
          aria-label='Назад'
          color='dark'
          size='lg'
          variant='subtle'
          onClick={() => router.history.go()}
        >
          <ChevronLeft />
        </ActionIcon>
        <Title fw={700} order={2}>
          Заказ №{order._id}
        </Title>
      </div>

      <div className={styles.card}>
        <div className={styles.field}>
          <Text c='#b7b7b7' fw={500} fz={14}>
            Статус
          </Text>
          <Text fw={500} fz={16}>
            {STATUS_LABEL[order.status]}
          </Text>
        </div>

        <DeliveryStatusStepper status={order.status} />

        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.field}>
              <Text c='#b7b7b7' fw={500} fz={14}>
                Адрес доставки
              </Text>
              <Text fw={500} fz={16}>
                {formatDeliveryAddress(order)}
              </Text>
            </div>
            <div className={styles.field}>
              <Text c='#969696' fw={500} fz={14}>
                Получатель
              </Text>
              <Text fz={18}>{formatPerson(order.receiver)}</Text>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.field}>
              <Text c='#969696' fw={500} fz={14}>
                Кто оплачивает доставку
              </Text>
              <Text fz={18}>{getPayerLabel(order.payer)}</Text>
            </div>
            <div className={styles.field}>
              <Text c='#b7b7b7' fw={500} fz={14}>
                Тип доставки
              </Text>
              <Text fw={500} fz={16}>
                {getOptionLabel(order.option)}
              </Text>
            </div>
          </div>
        </div>

        {order.cancellable && (
          <Button
            className={styles.cancel}
            disabled={order.status === 'canceled'}
            loading={!cancelOrder.ready()}
            size='lg'
            onClick={() => cancelOrder(order._id, onRefetch)}
          >
            Отменить заказ
          </Button>
        )}
      </div>
    </div>
  );
});
