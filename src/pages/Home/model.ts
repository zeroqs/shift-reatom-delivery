import type { DeliveryPoint } from '@api';

import { reatomForm } from '@reatom/core';
import z from 'zod';

import { createCityField, createPackageField } from './utils/formFields';

const citySchema = z
  .object({
    latitude: z.number(),
    longitude: z.number()
  })
  .nullable()
  .refine(Boolean, 'Выберите город');

const packageSchema = z
  .object({
    height: z.number(),
    length: z.number(),
    weight: z.number(),
    width: z.number()
  })
  .nullable()
  .refine(Boolean, 'Выберите размер посылки');

const deliveryFormSchema = z.object({
  package: packageSchema,
  receiverPoint: citySchema,
  senderPoint: citySchema
});

export const createDeliveryForm = (points: Array<DeliveryPoint>) =>
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
        console.log(values);
      }
    }
  );

export type DeliveryForm = ReturnType<typeof createDeliveryForm>;
