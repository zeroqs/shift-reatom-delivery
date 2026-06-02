import type { DeliveryPoint } from '@api';

import { reatomField, reatomForm } from '@reatom/core';

interface CityField {
  latitude: number;
  longitude: number;
}

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

const createCityField = (points: Array<DeliveryPoint>, name: string) =>
  reatomField<CityField | null, string>(null, {
    name,
    fromState: (state) => getCityName(points, state),
    toState: (value) => getCityValue(points, value)
  });

export const createDeliveryForm = (points: Array<DeliveryPoint>) =>
  reatomForm(
    {
      senderPoint: createCityField(points, 'sendingCity'),
      receiverPoint: createCityField(points, 'destinationCity')
    },
    {
      onSubmit: async (values) => {
        console.log(values);
      }
    }
  );

export type DeliveryForm = ReturnType<typeof createDeliveryForm>;
