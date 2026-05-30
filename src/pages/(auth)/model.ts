import { postApiAuthOtp, postApiUsersSignin } from '@api';
import { reatomField, reatomForm, wrap } from '@reatom/core';
import { ResponseError } from '@siberiacancode/fetches';
import z from 'zod';

import { router } from '@/app/router';
import { tokenAtom, userAtom } from '@/app/user.model';
import { showErrorNotification } from '@/shared/utils';

import { createCountdownTimer } from './utils';

const phoneSchema = z.object({
  phone: z.string().length(11, 'Номер телефона должен быть 11 символов')
});

const otpSchema = z.object({
  code: z.string().length(6, 'Код должен быть 6 символов')
});

export const phoneField = reatomField<string, string>('', {
  name: 'phoneField',
  fromState: (state) => state.replace(/^8/, '7'),
  toState: (value) => value.replace(/^7/, '8')
});

export const otpRetryTmer = createCountdownTimer({
  name: 'otpRetryTmer',
  tickIntervalMs: 1000
});

export const phoneForm = reatomForm(
  {
    phone: phoneField
  },
  {
    schema: phoneSchema,
    keepErrorOnChange: false,
    onSubmit: async (values) => {
      try {
        const otpResponse = await wrap(postApiAuthOtp({ body: values }));

        if (otpResponse.data.success) {
          otpRetryTmer.startMs(otpResponse.data.retryDelay);
        } else {
          otpRetryTmer.endTimer();
          showErrorNotification(otpResponse.data.reason);
        }

        return otpResponse.data;
      } catch (error) {
        if (error instanceof ResponseError) {
          otpRetryTmer.endTimer();
          showErrorNotification(error.response.data.reason);

          return error.response.data;
        }

        throw error;
      }
    }
  }
);

export const createLoginForm = () =>
  reatomForm(
    {
      code: ''
    },
    {
      schema: otpSchema,
      keepErrorOnChange: false,
      onSubmit: async ({ code }) => {
        const phone = phoneField();

        try {
          const authResponse = await wrap(
            postApiUsersSignin({ body: { phone, code: Number(code) } })
          );

          if (!authResponse.data.success) showErrorNotification(authResponse.data.reason);
          else {
            tokenAtom.set(authResponse.data.token);
            userAtom.set(authResponse.data.user);
            router.home.go();
          }

          return authResponse.data;
        } catch (error) {
          console.error(error);
          if (error instanceof ResponseError) {
            showErrorNotification(error.response.data.reason);

            return error.response.data;
          }
        }
      }
    }
  );

export type LoginPhoneForm = typeof phoneForm;
export type LoginForm = ReturnType<typeof createLoginForm>;
