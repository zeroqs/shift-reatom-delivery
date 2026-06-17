import type { DeliveryOption } from '@api';

import { atom, computed } from '@reatom/core';

export const deliveryOptionsAtom = atom<DeliveryOption[]>([]);

export const hasDeliveryOptionsAtom = computed(() => deliveryOptionsAtom().length > 0);
