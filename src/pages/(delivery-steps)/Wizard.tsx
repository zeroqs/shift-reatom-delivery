import type { ReactElement } from 'react';

import { Anchor, Breadcrumbs } from '@mantine/core';
import { reatomComponent } from '@reatom/react';
import { ChevronRight, House } from 'lucide-react';

import { router } from '@/app/router';

import type { Step } from './types';

import { OrderInfo, Progress } from './components';
import { breadcrumbsAtom, getDeliveryStepPath, stepAtom } from './model';
import {
  DeliveryType,
  DeliveryVerification,
  Payer,
  Receiver,
  ReceiverAddress,
  Sender,
  SenderAddress
} from './steps';
import { ALL_BREADCRUMBS, INITIAL_STEP } from './utils';

import styles from './styles.module.css';

const COMPONENTS: Record<Step, ReactElement> = {
  deliveryType: <DeliveryType />,
  receiver: <Receiver />,
  sender: <Sender />,
  receiverAddress: <ReceiverAddress />,
  senderAddress: <SenderAddress />,
  payer: <Payer />,
  deliveryVerification: <DeliveryVerification />
};

export const Wizard = reatomComponent(() => (
  <main className={styles.container}>
    <div className={styles.leftSide}>
      <header className={styles.header}>
        <Breadcrumbs mt='xs' separator={<ChevronRight />} separatorMargin='sm'>
          <Anchor
            aria-label='На главную'
            className={styles.homeBreadcrumb}
            component='button'
            type='button'
            onClick={() => router.home.go()}
          >
            <House size={18} />
          </Anchor>
          {breadcrumbsAtom().map((step) => (
            <Anchor key={step} href={getDeliveryStepPath(step)}>
              {ALL_BREADCRUMBS[step].title}
            </Anchor>
          ))}
        </Breadcrumbs>

        <Progress />
      </header>

      <div className={styles.content}>{COMPONENTS[stepAtom()]}</div>
    </div>

    {stepAtom() !== INITIAL_STEP && <OrderInfo />}
  </main>
));
