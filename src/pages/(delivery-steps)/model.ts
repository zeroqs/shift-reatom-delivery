import type { Computed } from '@reatom/core';

import { action, computed, reatomSet } from '@reatom/core';

import { router } from '@/app/router';

import type { Step } from './types';

import { ALL_BREADCRUMBS, BREADCRUMB_STEPS, INITIAL_STEP } from './utils';

export const stepAtom = computed(() => router.deliveryFormStep()?.step ?? INITIAL_STEP);

export const goToDeliveryStep = action((step: Step, replace?: boolean) => {
  router.deliveryFormStep.go({ step }, replace);
}, 'delivery.goToStep');

export const getDeliveryStepPath = (step: Step) => router.deliveryFormStep.path({ step });

export const breadcrumbsAtom = computed(() => {
  const currentStepIndex = BREADCRUMB_STEPS.indexOf(stepAtom());

  return BREADCRUMB_STEPS.slice(0, currentStepIndex + 1);
});

export const currentStepTitleAtom = computed(() => ALL_BREADCRUMBS[stepAtom()].title);
export const currentStepNumberAtom = computed(() => BREADCRUMB_STEPS.indexOf(stepAtom()) + 1);

export const goBackStep = action(() => {
  const currentStepIndex = BREADCRUMB_STEPS.indexOf(stepAtom());
  goToDeliveryStep(BREADCRUMB_STEPS[currentStepIndex - 1]);
});

export type OrderInfoAtom = Computed<{ title: string; text: string | undefined }>;

export const completedStepsAtom = reatomSet<OrderInfoAtom>([], 'completedSteps');

export const orderInfoAtom = computed(() =>
  [...completedStepsAtom()].map((infoAtom) => infoAtom())
);
