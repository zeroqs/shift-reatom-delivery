import type { DeliveryPoint } from '@api';

export const CITY_TIPS_COUNT = 3;

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
