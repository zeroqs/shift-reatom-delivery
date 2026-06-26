import type { DeliveryOrder } from '@api';

import { Badge, Button, Text, Title } from '@mantine/core';
import { reatomComponent } from '@reatom/react';

import { formatOrderAddress, STATUS_CONFIG } from './model';

import styles from './styles.module.css';

interface HistoryModel {
  orders: DeliveryOrder[];
}

interface Props {
  model: HistoryModel;
}

export const History = reatomComponent(({ model }: Props) => {
  const { orders } = model;

  return (
    <div className={styles.history}>
      <Title fw={700} order={2}>
        История отправлений
      </Title>

      {!orders.length && (
        <Text c='#969696' fw={500} fz={16}>
          У вас пока нет отправлений
        </Text>
      )}

      {orders.length && (
        <div className={styles.list}>
          {orders.map((order) => {
            const status = STATUS_CONFIG[order.status];
            const StatusIcon = status.icon;

            return (
              <div key={order._id} className={styles.row}>
                <div className={styles.status}>
                  <Badge
                    fw={700}
                    radius='xl'
                    rightSection={<StatusIcon size={16} />}
                    size='lg'
                    style={{ textTransform: 'none' }}
                    variant={status.variant}
                  >
                    {status.label}
                  </Badge>
                </div>

                <Text className={styles.address} fw={500} fz={16}>
                  {formatOrderAddress(order)}
                </Text>

                <Text c='#0b0b0b' className={styles.id} fw={500} fz={14}>
                  {order._id}
                </Text>

                <Button className={styles.more} size='md' variant='light'>
                  Подробнее
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
