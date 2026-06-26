import type { DeliveryOrder } from '@api';

export const formatDeliveryAddress = (order: DeliveryOrder): string => {
  const { receiverPoint, receiverAddress } = order;

  return [
    'Россия',
    `г. ${receiverPoint.name}`,
    `ул. ${receiverAddress.street}`,
    `д. ${receiverAddress.house}`,
    `кв. ${receiverAddress.apartment}`
  ].join(', ');
};
