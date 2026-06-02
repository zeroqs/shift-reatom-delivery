import { getApiDeliveryPoints } from '@api';
import { sleep, wrap } from '@reatom/core';

import { isAuthenticated } from '@/app/user.model';
import { CodeConfirmPage, Home, PhoneLoginPage, Profile } from '@/pages';
import { createLoginForm, phoneField, phoneForm } from '@/pages/(auth)/model';
import { createDeliveryForm } from '@/pages/Home/model';
import { getDeliveryCities, getRandomCityTips } from '@/pages/Home/utils';
import { createProfileForm } from '@/pages/Profile/model';
import { LoaderPage } from '@/shared';

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
  loader: async () => {
    await wrap(sleep(80));

    return { form: phoneForm };
  },
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
  loader: async () => {
    await wrap(sleep(80));

    return { form: createLoginForm() };
  },
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
    const response = await getApiDeliveryPoints();
    const cities = getDeliveryCities(response.data.points);
    const form = createDeliveryForm(response.data.points);

    return {
      points: response.data.points,
      cities,
      tips: getRandomCityTips(cities),
      form
    };
  },
  render: (self) => {
    const status = self.loader.status();

    if (status.data) return <Home model={status.data} />;
    if (status.isRejected) return <>Ошибка</>;

    return <LoaderPage />;
  }
});

export const profileRoute = authenticatedRoute.reatomRoute({
  path: 'profile',
  loader: async () => {
    await wrap(sleep(80));

    return { form: createProfileForm() };
  },
  render: (self) => {
    const status = self.loader.status();

    if (status.data) return <Profile model={status.data} />;
    if (status.isRejected) return <>Ошибка</>;

    return <LoaderPage />;
  }
});
