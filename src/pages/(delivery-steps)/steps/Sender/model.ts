import { computed, reatomForm } from '@reatom/core';
import z from 'zod';

import { createPhoneField } from '@/shared';

import { completedStepsAtom, goToDeliveryStep } from '../../model';

const senderSchema = z.object({
  lastname: z.string().min(1, 'Введите фамилию'),
  firstname: z.string().min(1, 'Введите имя'),
  middlename: z.string().optional(),
  phone: z.string().length(11, 'Номер телефона должен быть 11 символов')
});

export const senderPhoneField = createPhoneField('sender.phone');

export const senderForm = reatomForm(
  {
    lastname: '',
    firstname: '',
    middlename: '',
    phone: senderPhoneField
  },
  {
    schema: senderSchema,
    keepErrorOnChange: false,
    onSubmit: async () => {
      // eslint-disable-next-line ts/no-use-before-define
      completedStepsAtom.add(senderInfoAtom);
      goToDeliveryStep('receiverAddress');
    }
  }
);

export const senderInfoAtom = computed(() => {
  const { lastname, firstname, middlename, phone } = senderForm.fields;
  return { title: 'Отправитель', text: `${lastname()} ${firstname()} ${middlename()}, ${phone()}` };
});
