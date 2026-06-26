import type { DeliveryOrder, DeliveryStatus } from '@api';
import type { LucideIcon } from 'lucide-react';

import { Ban, CircleCheck, CirclePlus, Clock, Truck } from 'lucide-react';

interface StatusConfig {
  icon: LucideIcon;
  label: string;
  variant: string;
}

export const STATUS_CONFIG: Record<DeliveryStatus, StatusConfig> = {
  in_processing: { label: 'создан', variant: 'status-created', icon: CirclePlus },
  waiting_courier: { label: 'ожидает курьера', variant: 'status-waiting', icon: Clock },
  on_my_way: { label: 'в пути', variant: 'status-transit', icon: Truck },
  success: { label: 'доставлен', variant: 'status-delivered', icon: CircleCheck },
  canceled: { label: 'отменён', variant: 'status-canceled', icon: Ban }
};

export const formatOrderAddress = (order: DeliveryOrder): string => {
  const { receiverPoint, receiverAddress } = order;

  return [
    'Россия',
    `г. ${receiverPoint.name}`,
    `ул. ${receiverAddress.street}`,
    `д. ${receiverAddress.house}`,
    `кв. ${receiverAddress.apartment}`
  ].join(', ');
};
