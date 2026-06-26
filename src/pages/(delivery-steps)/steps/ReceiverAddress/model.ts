import { computed, reatomForm } from '@reatom/core';
import z from 'zod';

import { completedStepsAtom, goToDeliveryStep } from '../../model';

const receiverAddressSchema = z.object({
  street: z.string().min(1, 'Введите улицу'),
  house: z.string().min(1, 'Введите дом'),
  apartment: z.string().optional(),
  comment: z.string().optional(),
  isNonContact: z.boolean()
});

export const receiverAddressForm = reatomForm(
  {
    street: '',
    house: '',
    apartment: '',
    comment: '',
    isNonContact: false
  },
  {
    schema: receiverAddressSchema,
    keepErrorOnChange: false,
    onSubmit: async () => {
      // eslint-disable-next-line ts/no-use-before-define
      completedStepsAtom.add(receiverAddressInfoAtom);
      goToDeliveryStep('senderAddress');
    }
  }
);

export const receiverAddressInfoAtom = computed(() => {
  const { street, house, apartment } = receiverAddressForm.fields;
  const apt = apartment() ? `, кв. ${apartment()}` : '';
  return { title: 'Адрес получателя', text: `ул. ${street()}, д. ${house()}${apt}` };
});
