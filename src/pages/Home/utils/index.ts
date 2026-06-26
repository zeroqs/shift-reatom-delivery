import type { DeliveryPackageType, DeliveryPoint } from '@api';

import type { CityField, PackageField } from '../types/types';

export const CITY_TIPS_COUNT = 3;

export const resolveDeliverySelection = (
  points: Array<DeliveryPoint>,
  packageTypes: Array<DeliveryPackageType>,
  values: { senderPoint: CityField; receiverPoint: CityField; package: PackageField }
) => {
  const senderPoint = points.find(
    (point) =>
      point.latitude === values.senderPoint.latitude &&
      point.longitude === values.senderPoint.longitude
  )!;
  const receiverPoint = points.find(
    (point) =>
      point.latitude === values.receiverPoint.latitude &&
      point.longitude === values.receiverPoint.longitude
  )!;
  const packageType = packageTypes.find(
    (type) =>
      type.height === values.package.height &&
      type.width === values.package.width &&
      type.length === values.package.length &&
      type.weight === values.package.weight
  )!;

  return { senderPoint, receiverPoint, packageType };
};

export const shuffleCities = (cities: Array<string>) => {
  for (let index = cities.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const city = cities[index];

    cities[index] = cities[randomIndex];
    cities[randomIndex] = city;
  }

  return cities;
};

export const getDeliveryCities = (points: Array<DeliveryPoint>) => [
  ...new Set(points.map((point) => point.name))
];

export const getRandomCityTips = (cities: Array<string>) => {
  const shuffledCities = shuffleCities([...cities]);

  return {
    senderCities: shuffledCities.slice(0, CITY_TIPS_COUNT),
    receiverCities: shuffledCities.slice(CITY_TIPS_COUNT, CITY_TIPS_COUNT * 2)
  };
};
