import { Button, Divider, Text, Title } from '@mantine/core';
import { reatomComponent } from '@reatom/react';
import { CircleCheck } from 'lucide-react';

import { router } from '@/app/router';

import { sentOrderAtom } from './model';

import styles from './styles.module.css';

const priceFormatter = new Intl.NumberFormat('ru-RU');

export const ApplicationSent = reatomComponent(() => {
  const order = sentOrderAtom();

  if (!order) return null;

  const left = order.items.slice(0, 3);
  const right = order.items.slice(3);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CircleCheck color='#fff' fill='#3bc15f' size={56} />

        <div className={styles.description}>
          <Title fw={700} order={3}>
            Заявка отправлена
          </Title>
          <Text fw={500} fz={16}>
            Вы можете оплатить ваш заказ в разделе «Профиль»
          </Text>
        </div>
      </div>

      <div className={styles.card}>
        <Title fw={700} order={3}>
          Ваш заказ
        </Title>

        <div className={styles.row}>
          <Text c='#969696' fw={500} fz={14}>
            Номер заказа
          </Text>
          <Text fz={18}>{order.number}</Text>
        </div>

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

        <div className={styles.total}>
          <Title fw={700} order={2}>
            Итого:
          </Title>
          <Title fw={700} order={2}>
            {priceFormatter.format(order.price)}₽
          </Title>
        </div>

        <Text c='#969696' fw={500} fz={16}>
          Вся информация была продублирована в SMS
        </Text>
      </div>

      <div className={styles.actions}>
        <Button fullWidth size='lg' variant='light' onClick={() => router.profile.go()}>
          Статус заявки
        </Button>
        <Button fullWidth size='lg' onClick={() => router.home.go()}>
          На главную
        </Button>
      </div>
    </div>
  );
});
