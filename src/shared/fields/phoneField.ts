import { reatomField } from '@reatom/core';

export const createPhoneField = (name: string) =>
  reatomField<string, string>('', {
    name,
    fromState: (state) => state.replace(/^8/, '7'),
    toState: (value) => value.replace(/^7/, '8')
  });
