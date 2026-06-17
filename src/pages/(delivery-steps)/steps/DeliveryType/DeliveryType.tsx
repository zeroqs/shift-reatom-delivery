import { Text, Title, UnstyledButton } from '@mantine/core';
import { reatomComponent } from '@reatom/react';
import { ChevronRight } from 'lucide-react';

import { goToDeliveryStep } from '../../model';
import { deliveryOptionsAtom } from './model';

import styles from './styles.module.css';

const priceFormatter = new Intl.NumberFormat('ru-RU');

const getWorkingDaysText = (days: number) => {
  const lastTwoDigits = days % 100;
  const lastDigit = days % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${days} рабочих дней`;
  if (lastDigit === 1) return `${days} рабочий день`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${days} рабочих дня`;

  return `${days} рабочих дней`;
};

export const DeliveryType = reatomComponent(() => {
  const options = deliveryOptionsAtom().toSorted((first, second) => first.days - second.days);

  return (
    <div className={styles.options}>
      {options.map((option) => (
        <UnstyledButton
          key={option.id}
          className={styles.card}
          onClick={() => goToDeliveryStep('receiver')}
        >
          <div className={styles.content}>
            <Title order={4}>{option.name}</Title>

            <Text className={styles.price}>{priceFormatter.format(option.price)} ₽</Text>

            <Text c='dimmed' size='md'>
              {getWorkingDaysText(option.days)}
            </Text>
          </div>

          <ChevronRight className={styles.icon} />
        </UnstyledButton>
      ))}
    </div>
  );
});
