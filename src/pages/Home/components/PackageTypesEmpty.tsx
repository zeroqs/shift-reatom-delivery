import { Button, Combobox } from '@mantine/core';

import type { PackageTypesEmptyProps } from '../types/types';

import styles from '../styles.module.css';

export const PackageTypesEmpty = ({ isError, onRetry }: PackageTypesEmptyProps) => {
  if (!isError) return <Combobox.Empty>Ничего не найдено</Combobox.Empty>;

  return (
    <Combobox.Empty>
      <div className={styles.selectRetry}>
        <span>Не удалось загрузить размеры посылок</span>
        <Button
          size='md'
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
    </Combobox.Empty>
  );
};
