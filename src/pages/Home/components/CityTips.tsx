import { Anchor } from '@mantine/core';

import type { CityTipsProps } from '../types/types';

import styles from '../styles.module.css';

export const CityTips = ({ cities, onSelectCity }: CityTipsProps) => (
  <div className={styles.tips}>
    {cities.map((city) => (
      <Anchor
        key={city}
        className={styles.tip}
        component='button'
        type='button'
        underline='always'
        onClick={() => onSelectCity(city)}
      >
        {city}
      </Anchor>
    ))}
  </div>
);
