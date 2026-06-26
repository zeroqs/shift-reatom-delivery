import { computed, reatomForm } from '@reatom/core';
import z from 'zod';

import { createPhoneField, formatPhone } from '@/shared';

import { completedStepsAtom, goToDeliveryStep } from '../../model';

const receiverSchema = z.object({
  lastname: z.string().min(1, 'Введите фамилию'),
  firstname: z.string().min(1, 'Введите имя'),
  middlename: z.string().optional(),
  phone: z.string().length(11, 'Номер телефона должен быть 11 символов')
});

export const receiverPhoneField = createPhoneField('receiver.phone');

export const receiverForm = reatomForm(
  {
    lastname: '',
    firstname: '',
    middlename: '',
    phone: receiverPhoneField
  },
  {
    schema: receiverSchema,
    keepErrorOnChange: false,
    onSubmit: async () => {
      // eslint-disable-next-line ts/no-use-before-define
      completedStepsAtom.add(receiverInfoAtom);
      goToDeliveryStep('sender');
    }
  }
);

export const receiverInfoAtom = computed(() => {
  const { lastname, firstname, middlename } = receiverForm.fields;
  return {
    title: 'Получатель',
    text: `${lastname()} ${firstname()} ${middlename()}, ${formatPhone(receiverPhoneField.value())}`
  };
});

export type ReceiverForm = typeof receiverForm;
