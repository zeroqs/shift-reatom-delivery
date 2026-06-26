import type { DeliveryPackageType, DeliveryPoint } from '@api';

import { postApiDeliveryCalc } from '@api';
import { notifications } from '@mantine/notifications';
import { atom, reatomForm, withSessionStorage } from '@reatom/core';
import z from 'zod';

import { router } from '@/app/router';
import { catchError } from '@/shared';

import { deliveryOptionsAtom } from '../(delivery-steps)/steps/DeliveryType/model';
import { INITIAL_STEP } from '../(delivery-steps)/utils';
import { resolveDeliverySelection } from './utils';
import { createCityField, createPackageField } from './utils/formFields';

const citySchema = z
  .object({
    latitude: z.number(),
    longitude: z.number()
  })
  .nullable()
  .refine(Boolean, 'Выберите город')
  .transform((value) => value!);

const packageSchema = z
  .object({
    height: z.number(),
    length: z.number(),
    weight: z.number(),
    width: z.number()
  })
  .nullable()
  .refine(Boolean, 'Выберите размер посылки')
  .transform((value) => value!);

const deliveryFormSchema = z.object({
  package: packageSchema,
  receiverPoint: citySchema,
  senderPoint: citySchema
});

export const packageIdAtom = atom('', 'packageId').extend(
  withSessionStorage({ key: 'orderPackageId' })
);
export const senderPointIdAtom = atom('', 'senderPointId').extend(
  withSessionStorage({ key: 'orderSenderPointId' })
);
export const receiverPointIdAtom = atom('', 'receiverPointId').extend(
  withSessionStorage({ key: 'orderReceiverPointId' })
);

export const createDeliveryForm = (
  points: Array<DeliveryPoint>,
  packageTypes: Array<DeliveryPackageType>
) =>
  reatomForm(
    {
      package: createPackageField(),
      senderPoint: createCityField(points, 'sendingCity'),
      receiverPoint: createCityField(points, 'destinationCity')
    },
    {
      schema: deliveryFormSchema,
      keepErrorOnChange: false,
      onSubmit: async (values) => {
        const response = await catchError(() => postApiDeliveryCalc({ body: values }));
        if (response.error) {
          notifications.show({
            title: 'Ошибка',
            message: response.error.message,
            color: 'red'
          });
          return;
        }

        const { senderPoint, receiverPoint, packageType } = resolveDeliverySelection(
          points,
          packageTypes,
          values
        );

        senderPointIdAtom.set(senderPoint.id);
        receiverPointIdAtom.set(receiverPoint.id);
        packageIdAtom.set(packageType.id);

        deliveryOptionsAtom.set(response.result.data.options);
        router.deliveryFormStep.go({
          step: INITIAL_STEP
        });
      }
    }
  );

export type DeliveryForm = ReturnType<typeof createDeliveryForm>;
