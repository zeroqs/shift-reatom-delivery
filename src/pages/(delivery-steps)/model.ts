import { action, computed } from '@reatom/core';

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
