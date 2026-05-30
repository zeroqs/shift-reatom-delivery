import { patchApiUsersProfile } from '@api';
import { notifications } from '@mantine/notifications';
import { reatomForm } from '@reatom/core';
import { ResponseError } from '@siberiacancode/fetches';
import z from 'zod';

import { userAtom } from '@/app/user.model';
import { showErrorNotification } from '@/shared';

const profileSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  middlename: z.string(),
  phone: z.string().length(11, 'Номер телефона должен быть 11 символов'),
  email: z.email('Некорректный email'),
  city: z.string()
});

export const createProfileForm = () =>
  reatomForm(
    {
      firstname: userAtom()?.firstname ?? '',
      lastname: userAtom()?.lastname ?? '',
      middlename: userAtom()?.middlename ?? '',
      phone: userAtom()?.phone ?? '',
      email: userAtom()?.email ?? '',
      city: userAtom()?.city ?? ''
    },
    {
      schema: profileSchema,
      onSubmit: async ({ lastname, firstname, middlename, email, city, phone }) => {
        try {
          const response = await patchApiUsersProfile({
            body: {
              phone,
              profile: {
                lastname,
                firstname,
                middlename,
                email,
                city
              }
            }
          });

          if (!response.data.success) showErrorNotification(response.data.reason);
          else {
            userAtom.set(response.data.user);
            notifications.show({
              title: 'Успех',
              message: 'Профиль успешно обновлен',
              color: 'green'
            });
          }
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

export type ProfileForm = ReturnType<typeof createProfileForm>;
