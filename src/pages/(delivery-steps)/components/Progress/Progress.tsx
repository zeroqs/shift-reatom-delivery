import { Title, Typography } from '@mantine/core';
import { reatomComponent } from '@reatom/react';

import { currentStepNumberAtom, currentStepTitleAtom } from '../../model';
import { BREADCRUMB_STEPS } from '../../utils';

import styles from './styles.module.css';

export const Progress = reatomComponent(() => {
  const currentStepNumber = currentStepNumberAtom();
  const stepsCount = BREADCRUMB_STEPS.length;
  const progress = (currentStepNumber / stepsCount) * 100;

  return (
    <div className={styles.progress}>
      <Title order={2}>{currentStepTitleAtom()}</Title>

      <div>
        <Typography>
          Шаг {currentStepNumber} из {stepsCount}
        </Typography>

        <div
          aria-label='Прогресс оформления доставки'
          aria-valuemax={stepsCount}
          aria-valuemin={1}
          aria-valuenow={currentStepNumber}
          className={styles.progressBar}
          role='progressbar'
        >
          <div className={styles.progressValue} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
});
