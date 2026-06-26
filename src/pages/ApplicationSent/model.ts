import { atom, withSessionStorage } from '@reatom/core';

export interface SentOrder {
  items: Array<{ title: string; text: string | undefined }>;
  number: string;
  price: number;
}

export const sentOrderAtom = atom<SentOrder | null>(null, 'sentOrder').extend(
  withSessionStorage({ key: 'sentOrder' })
);
