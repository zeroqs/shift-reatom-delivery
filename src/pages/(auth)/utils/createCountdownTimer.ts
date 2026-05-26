import type { Action, Atom, Computed } from '@reatom/core';

import { action, atom, computed, sleep, wrap } from '@reatom/core';

const DEFAULT_TICK_INTERVAL_MS = 1000;
const MIN_DELAY_MS = 1;

interface TimerAtom extends Atom<number | null> {
  endTimer: Action<[], void>;
  intervalAtom: Atom<number> & {
    setSeconds: Action<[seconds: number], number>;
  };
  progressAtom: Computed<number>;
  remainingSecondsAtom: Computed<number | null>;
  startMs: Action<[delay: number], Promise<void>>;
  startSeconds: Action<[delay: number], Promise<void>>;
}

interface Options {
  name: string;
  tickIntervalMs?: number;
}

export const createCountdownTimer = ({
  name,
  tickIntervalMs = DEFAULT_TICK_INTERVAL_MS
}: Options): TimerAtom => {
  let timerVersion = 0;
  const timerAtom = atom<number | null>(null, name);
  const durationAtom = atom<number | null>(null, `${name}.durationAtom`);

  const intervalAtom = atom(tickIntervalMs, `${name}.intervalAtom`).extend((target) => ({
    setSeconds: action((seconds: number) => {
      const nextInterval = seconds * 1000;

      target.set(nextInterval);

      return nextInterval;
    }, `${name}.intervalAtom.setSeconds`)
  }));

  const remainingSecondsAtom = computed(() => {
    const remains = timerAtom();

    if (remains === null) return null;

    return Math.ceil(remains / 1000);
  }, `${name}.remainingSecondsAtom`);

  const progressAtom = computed(() => {
    const remains = timerAtom();
    const duration = durationAtom();

    if (remains === null || duration === null || duration <= 0) return 0;

    return Math.min(1, Math.max(0, 1 - remains / duration));
  }, `${name}.progressAtom`);

  const startMs = action(async (delay: number) => {
    timerVersion += 1;

    const version = timerVersion;
    const normalizedDelay = Math.max(MIN_DELAY_MS, delay);
    const targetTime = Date.now() + normalizedDelay;

    durationAtom.set(normalizedDelay);
    timerAtom.set(normalizedDelay);

    // eslint-disable-next-line no-unmodified-loop-condition
    while (version === timerVersion) {
      const remains = Math.max(0, targetTime - Date.now());

      if (remains <= 0) {
        durationAtom.set(null);
        timerAtom.set(null);
        return;
      }

      timerAtom.set(remains);

      const interval = intervalAtom();
      const tickDelay = remains < interval ? remains : remains % interval || interval;

      await wrap(sleep(tickDelay));
    }
  }, `${name}.startMs`);

  const startSeconds = action(async (delay: number) => {
    await startMs(delay * 1000);
  }, `${name}.startSeconds`);

  const endTimer = action(() => {
    timerVersion += 1;
    durationAtom.set(null);
    timerAtom.set(null);
  }, `${name}.endTimer`);

  return Object.assign(timerAtom, {
    startMs,
    startSeconds,
    intervalAtom,
    remainingSecondsAtom,
    progressAtom,
    endTimer
  });
};
