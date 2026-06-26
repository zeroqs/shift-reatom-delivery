import type { DeliveryOption } from '@api';

import { atom, computed, withSessionStorage } from '@reatom/core';

export const deliveryOptionsAtom = atom<DeliveryOption[]>([]).extend(
  withSessionStorage({
    key: 'deliveryOptions'
  })
);

export const hasDeliveryOptionsAtom = computed(() => deliveryOptionsAtom().length > 0);

export const selectedDeliveryOptionAtom = atom<DeliveryOption | undefined>(undefined).extend(
  withSessionStorage({
    key: 'selectedDeliveryOption'
  })
);

export const deliveryTypeInfoAtom = computed(() => ({
  title: 'Тип доставки',
  text: selectedDeliveryOptionAtom()?.name
}));
