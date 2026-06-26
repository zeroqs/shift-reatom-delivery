import { computed, reatomForm } from '@reatom/core';
import z from 'zod';

import { completedStepsAtom, goToDeliveryStep } from '../../model';

const payerSchema = z.object({
  payer: z.enum(['receiver', 'sender'], { message: 'Выберите плательщика' })
});

export const payerForm = reatomForm(
  { payer: 'sender' as 'receiver' | 'sender' },
  {
    schema: payerSchema,
    keepErrorOnChange: false,
    onSubmit: async () => {
      // eslint-disable-next-line ts/no-use-before-define
      completedStepsAtom.add(payerInfoAtom);
      goToDeliveryStep('deliveryVerification');
    }
  }
);

export const payerInfoAtom = computed(() => ({
  title: 'Оплата',
  text: payerForm.fields.payer() === 'receiver' ? 'Получатель' : 'Отправитель'
}));
