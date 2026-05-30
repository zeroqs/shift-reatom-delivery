import { atom, computed, withLocalStorage } from '@reatom/core';
import { z } from 'zod';

import { router } from './router';

export const userSchema = z.object({
  _id: z.string(),
  phone: z.string(),
  firstname: z.string().optional(),
  middlename: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
  city: z.string().optional()
});

export type User = z.infer<typeof userSchema>;

export const tokenAtom = atom<string | null>(null, 'token').extend(
  withLocalStorage({
    key: 'token',
    schema: z.string().nullable()
  })
);

export const userAtom = atom<User | null>(null, 'user').extend(
  withLocalStorage({
    key: 'user',
    schema: userSchema.nullable()
  })
);

export const isAuthenticated = computed(() => userAtom() !== null, 'user.isAuthenticated');

export const logout = () => {
  userAtom.set(null);
  tokenAtom.set(null);
  router.login.go();
};
