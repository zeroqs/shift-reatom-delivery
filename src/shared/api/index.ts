import { instance } from '@api';

import { tokenAtom } from '@/app/user.model';

instance.interceptors.request.use(
  (config) => {
    const token = tokenAtom();

    if (token) {
      config.headers ??= {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
