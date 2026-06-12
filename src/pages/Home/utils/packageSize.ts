import type { DeliveryPackageType } from '@api';

import { z } from 'zod';

import type { CustomPackageSize, CustomPackageSizeErrors, PackageField } from '../types/types';

const packageSizeSchema = z.object({
  height: z.preprocess(
    (value) => Number(String(value).replace(',', '.')),
    z.number().positive('Введите высоту больше 0')
  ),
  length: z.preprocess(
    (value) => Number(String(value).replace(',', '.')),
    z.number().positive('Введите длину больше 0')
  ),
  weight: z.preprocess(
    (value) => Number(String(value).replace(',', '.')),
    z.number().positive('Введите вес больше 0')
  ),
  width: z.preprocess(
    (value) => Number(String(value).replace(',', '.')),
    z.number().positive('Введите ширину больше 0')
  )
});

export const getPackageTypeDimensions = (
  packageType: Pick<DeliveryPackageType, 'height' | 'length' | 'width'>
) => `${packageType.length}x${packageType.width}x${packageType.height} см`;

export const validateCustomPackageSize = (
  customSize: CustomPackageSize
): { errors: CustomPackageSizeErrors; packageValue: PackageField | null } => {
  const result = packageSizeSchema.safeParse(customSize);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    return {
      errors: {
        height: fieldErrors.height?.[0],
        length: fieldErrors.length?.[0],
        weight: fieldErrors.weight?.[0],
        width: fieldErrors.width?.[0]
      },
      packageValue: null
    };
  }

  return {
    errors: {},
    packageValue: result.data
  };
};
