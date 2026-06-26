import { computed, reatomForm } from '@reatom/core';
import z from 'zod';

import { completedStepsAtom, goToDeliveryStep } from '../../model';

const senderAddressSchema = z.object({
  street: z.string().min(1, 'Введите улицу'),
  house: z.string().min(1, 'Введите дом'),
  apartment: z.string().optional(),
  comment: z.string().optional()
});

export const senderAddressForm = reatomForm(
  {
    street: '',
    house: '',
    apartment: '',
    comment: ''
  },
  {
    schema: senderAddressSchema,
    keepErrorOnChange: false,
    onSubmit: async () => {
      // eslint-disable-next-line ts/no-use-before-define
      completedStepsAtom.add(senderAddressInfoAtom);
      goToDeliveryStep('payer');
    }
  }
);

export const senderAddressInfoAtom = computed(() => {
  const { street, house, apartment } = senderAddressForm.fields;
  const apt = apartment() ? `, кв. ${apartment()}` : '';
  return { title: 'Куда доставить', text: `ул. ${street()}, д. ${house()}${apt}` };
});
