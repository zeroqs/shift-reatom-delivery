import type { DeliveryOptionType, DeliveryPerson, DeliveryStatus, Payer } from '@api';

import { putApiDeliveryOrdersCancel } from '@api';
import { notifications } from '@mantine/notifications';
import { action, withAsync } from '@reatom/core';

import { catchError, formatPhone } from '@/shared';

export const STATUS_LABEL: Record<DeliveryStatus, string> = {
  in_processing: 'Создан',
  waiting_courier: 'Ждём курьера',
  on_my_way: 'Везём заказ',
  success: 'Доставлен',
  canceled: 'Отменён'
};

const OPTION_LABEL: Record<DeliveryOptionType, string> = {
  default: 'Стандартная доставка',
  express: 'Экспресс-доставка'
};

const PAYER_LABEL: Record<Payer, string> = {
  receiver: 'Получатель',
  sender: 'Отправитель'
};

export const getOptionLabel = (option: DeliveryOptionType): string => OPTION_LABEL[option];

export const getPayerLabel = (payer: Payer): string => PAYER_LABEL[payer];

export const formatPerson = (person: DeliveryPerson): string =>
  `${person.lastname} ${person.firstname} ${person.middlename}, ${formatPhone(person.phone)}`;

export const cancelOrder = action(async (orderId: string, onSuccess: () => void) => {
  const response = await catchError(() => putApiDeliveryOrdersCancel({ body: { orderId } }));

  if (response.error) {
    notifications.show({ title: 'Ошибка', message: response.error.message, color: 'red' });
    return;
  }

  notifications.show({ title: 'Готово', message: 'Заказ отменён', color: 'green' });
  onSuccess();
}, 'order.cancelOrder').extend(withAsync());
