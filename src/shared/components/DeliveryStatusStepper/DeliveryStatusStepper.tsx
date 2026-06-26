import type { DeliveryStatus } from '@api';

import { Stepper } from '@mantine/core';
import { Box, Car, CircleCheck, Clock5, X } from 'lucide-react';

import styles from './styles.module.css';

const STEPS = [
  { id: 'created', Icon: Clock5 },
  { id: 'packed', Icon: Box },
  { id: 'transit', Icon: Car },
  { id: 'delivered', Icon: CircleCheck }
];

interface StatusView {
  active: number;
  color: string;
  isCanceled?: boolean;
}

const STATUS_VIEW: Record<DeliveryStatus, StatusView> = {
  in_processing: { active: 0, color: '#facc15' },
  waiting_courier: { active: 1, color: '#facc15' },
  on_my_way: { active: 2, color: '#facc15' },
  success: { active: STEPS.length, color: '#22c55e' },
  canceled: { active: 0, color: '#ef4444', isCanceled: true }
};

interface Props {
  status: DeliveryStatus;
}

export const DeliveryStatusStepper = ({ status }: Props) => {
  const view = STATUS_VIEW[status];

  return (
    <Stepper
      classNames={{
        root: styles.root,
        separator: styles.separator,
        stepIcon: styles.stepIcon
      }}
      active={view.active}
      color={view.color}
      iconSize={32}
      style={{ '--stepper-outline-color': '#d4d4d4' }}
    >
      {STEPS.map((step, index) => {
        const StepIcon = view.isCanceled && index === 0 ? X : step.Icon;
        const icon = <StepIcon size={16} />;

        return <Stepper.Step key={step.id} completedIcon={icon} icon={icon} />;
      })}
    </Stepper>
  );
};
