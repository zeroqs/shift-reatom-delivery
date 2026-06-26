import type { MaskInputProps } from '@mantine/core';

import { MaskInput } from '@mantine/core';
import { formatMask } from '@mantine/hooks';

export const PHONE_MASK = '+7 (999) 999-99-99';

interface PhoneFieldBindings {
  error?: boolean | string | null;
  value: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  onFocus?: () => void;
}

interface Props extends Omit<
  MaskInputProps,
  'defaultValue' | 'mask' | 'onChange' | 'onChangeRaw' | 'value'
> {
  field: PhoneFieldBindings;
}

export const PhoneMaskInput = ({ field, ...props }: Props) => {
  const defaultValue = field.value
    ? formatMask(field.value.replace(/^7/, ''), { mask: PHONE_MASK })
    : '';

  // MaskInput is uncontrolled — sync stored value to DOM on mount
  const ref = (node: HTMLInputElement | null) => {
    if (!node || !defaultValue) return;

    queueMicrotask(() => {
      node.value = defaultValue;
      node.dispatchEvent(new Event('input', { bubbles: true }));
    });
  };

  return (
    <MaskInput
      ref={ref}
      defaultValue={defaultValue}
      mask={PHONE_MASK}
      placeholder='+7'
      {...props}
      error={field.error}
      onBlur={field.onBlur}
      onChangeRaw={(rawValue) => field.onChange(rawValue ? `7${rawValue}` : '')}
      onFocus={field.onFocus}
    />
  );
};
