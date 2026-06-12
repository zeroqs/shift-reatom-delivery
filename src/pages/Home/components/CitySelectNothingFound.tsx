import { Button } from '@mantine/core';

import type { CitySelectNothingFoundProps } from '../types/types';

import styles from '../styles.module.css';

export const CitySelectNothingFound = ({ isError, onRetry }: CitySelectNothingFoundProps) => {
  if (!isError) return 'Ничего не найдено';

  return (
    <div className={styles.selectRetry}>
      <span>Не удалось загрузить города</span>
      <Button
        size='xs'
        variant='subtle'
        onClick={(event) => {
          event.stopPropagation();
          onRetry();
        }}
        onMouseDown={(event) => event.preventDefault()}
      >
        Повторить
      </Button>
    </div>
  );
};
