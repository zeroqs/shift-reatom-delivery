import { sleep, wrap } from '@reatom/core';

import { isAuthenticated } from '@/app/user.model';
import { CodeConfirmPage, Home, PhoneLoginPage } from '@/pages';
import { loginForm, phoneField, phoneForm } from '@/pages/(auth)/model';
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

    return { form: loginForm };
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
  render: () => <Home />
});
