import type { DeliveryPackageType, DeliveryPoint } from '@api';

import { reatomField } from '@reatom/core';

import type { CityField, PackageField } from '../types/types';

import { getPackageTypeDimensions } from './packageSize';

const getCityName = (points: Array<DeliveryPoint>, city: CityField | null) => {
  if (!city) return '';

  return (
    points.find((point) => point.latitude === city.latitude && point.longitude === city.longitude)
      ?.name ?? ''
  );
};

const getCityValue = (points: Array<DeliveryPoint>, cityName: string) => {
  const point = points.find((item) => item.name === cityName);

  return point ? { latitude: point.latitude, longitude: point.longitude } : null;
};

export const createCityField = (points: Array<DeliveryPoint>, name: string) =>
  reatomField<CityField | null, string>(null, {
    name,
    fromState: (state) => getCityName(points, state),
    toState: (value) => getCityValue(points, value)
  });

export const createPackageField = () =>
  reatomField<PackageField | null, string>(null, {
    name: 'package',
    fromState: (state) => (state ? getPackageTypeDimensions(state) : '')
  });

export const getPackageFieldValue = (packageType: DeliveryPackageType): PackageField => ({
  height: packageType.height,
  length: packageType.length,
  weight: packageType.weight,
  width: packageType.width
});
