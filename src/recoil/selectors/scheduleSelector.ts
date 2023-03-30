import { selector } from 'recoil';
import { ScheduleState } from '@recoil/atoms/scheduleAtom';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';

export const ScheduleSelector = selector<ISchedule>({
  key: 'ScheduleSelector',
  get({ get }) {
    return get(ScheduleState);
  },
  set({ set, get }, newValue) {
    const oldValue = get(ScheduleState);
    if (oldValue !== newValue) {
      set(ScheduleState, newValue);
    }
  },
});

