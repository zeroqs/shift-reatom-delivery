import { Button, NumberInput, Stack } from '@mantine/core';

import type { CustomPackageSizeFormProps } from '../types/types';

export const CustomPackageSizeForm = ({
  errors,
  value,
  onChange,
  onSubmit
}: CustomPackageSizeFormProps) => (
  <Stack gap='xs' p='xs'>
    <NumberInput
      hideControls
      error={errors.length}
      label='Длина'
      min={0}
      placeholder='см'
      size='md'
      value={value.length}
      onChange={(length) => onChange('length', length)}
    />
    <NumberInput
      hideControls
      error={errors.width}
      label='Ширина'
      min={0}
      placeholder='см'
      size='md'
      value={value.width}
      onChange={(width) => onChange('width', width)}
    />
    <NumberInput
      hideControls
      error={errors.height}
      label='Высота'
      min={0}
      placeholder='см'
      size='md'
      value={value.height}
      onChange={(height) => onChange('height', height)}
    />
    <NumberInput
      hideControls
      error={errors.weight}
      label='Вес'
      min={0}
      placeholder='кг'
      size='md'
      value={value.weight}
      onChange={(weight) => onChange('weight', weight)}
    />

    <Button size='md' onClick={onSubmit}>
      Применить
    </Button>
  </Stack>
);
