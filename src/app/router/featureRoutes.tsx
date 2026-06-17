import { getApiDeliveryPackageTypes, getApiDeliveryPoints } from '@api';
import { retryComputed, wrap } from '@reatom/core';

import { isAuthenticated } from '@/app/user.model';
import { CodeConfirmPage, Home, PhoneLoginPage, Profile, Wizard } from '@/pages';
import { createLoginForm, phoneField, phoneForm } from '@/pages/(auth)/model';
import { hasDeliveryOptionsAtom } from '@/pages/(delivery-steps)/steps/DeliveryType/model';
import { INITIAL_STEP, isStep } from '@/pages/(delivery-steps)/utils';
import { createDeliveryForm } from '@/pages/Home/model';
import { getDeliveryCities, getRandomCityTips } from '@/pages/Home/utils';
import { createProfileForm } from '@/pages/Profile/model';
import { catchError, LoaderPage } from '@/shared';

import { router } from '.';
import { authenticatedRoute, rootRoute } from './internal';

export const loginRoute = rootRoute.reatomRoute({
  path: 'login',
  params: () => {
    if (isAuthenticated()) {
      router.home.go();
      return null;
    }
    return {};
  },
  loader: async () => ({ form: phoneForm }),
  render: (self) => {
    const status = self.loader.status();

    if (status.data) return <PhoneLoginPage model={status.data} />;
    if (status.isRejected) return <>error</>;

    return <LoaderPage />;
  }
});

export const loginConfirmRoute = loginRoute.reatomRoute({
  path: 'confirm',
  params: () => {
    if (isAuthenticated()) {
      router.home.go();
      return null;
    }

    const isPhoneField = phoneField();

    if (!isPhoneField) {
      loginRoute.go();
      return null;
    }
    return {};
  },
  loader: async () => ({ form: createLoginForm() }),
  render: (self) => {
    const status = self.loader.status();

    if (status.data) return <CodeConfirmPage model={status.data} />;
    if (status.isRejected) return <>error</>;

    return <LoaderPage />;
  }
});

export const homeRoute = authenticatedRoute.reatomRoute({
  path: '',
  loader: async () => {
    const points = await catchError(getApiDeliveryPoints);
    const packageTypes = await catchError(getApiDeliveryPackageTypes);

    const deliveryPoints = points.result?.data.points ?? [];
    const deliveryPackageTypes = packageTypes.result?.data.packages ?? [];
    const cities = getDeliveryCities(deliveryPoints);
    const form = createDeliveryForm(deliveryPoints);

    return {
      points: deliveryPoints,
      packageTypes: deliveryPackageTypes,
      isPointsError: Boolean(points.error),
      isPackageTypesError: Boolean(packageTypes.error),
      cities,
      tips: getRandomCityTips(cities),
      form
    };
  },
  render: (self) => {
    const status = self.loader.status();

    if (status.data)
      return <Home model={status.data} onRetry={wrap(() => retryComputed(self.loader))} />;
    if (status.isRejected) return <>Ошибка</>;

    return <LoaderPage />;
  }
});

export const profileRoute = authenticatedRoute.reatomRoute({
  path: 'profile',
  loader: async () => ({ form: createProfileForm() }),
  render: (self) => {
    const status = self.loader.status();

    if (status.data) return <Profile model={status.data} />;
    if (status.isRejected) return <>Ошибка</>;

    return <LoaderPage />;
  }
});

export const deliveryFormStepsRoute = authenticatedRoute.reatomRoute({
  path: 'delivery/:step',
  params: ({ step }: { step: string }) => {
    if (!hasDeliveryOptionsAtom()) {
      router.home.go();
      return null;
    }

    if (!isStep(step)) {
      router.deliveryFormStep.go({ step: INITIAL_STEP });
      return null;
    }

    return { step };
  },
  render: () => <Wizard />
});
