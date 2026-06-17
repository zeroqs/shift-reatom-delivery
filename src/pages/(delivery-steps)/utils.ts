import type { Step } from './types';

export const BREADCRUMB_STEPS: Step[] = [
  'deliveryType',
  'receiver',
  'sender',
  'receiverAddress',
  'senderAddress',
  'payer',
  'deliveryVerification'
];

export const isStep = (step: string): step is Step => BREADCRUMB_STEPS.includes(step as Step);

export const ALL_BREADCRUMBS: Record<Step, { title: string }> = {
  deliveryType: { title: 'Тип доставки' },
  receiver: { title: 'Получатель' },
  sender: { title: 'Отправитель' },
  receiverAddress: { title: 'Откуда забрать' },
  senderAddress: { title: 'Куда доставить' },
  payer: { title: 'Оплата доставки' },
  deliveryVerification: { title: 'Проверка данных' }
};

export const INITIAL_STEP: Step = 'deliveryType';
