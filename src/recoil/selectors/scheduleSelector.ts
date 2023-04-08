import _ from 'deep-equal';
import { selector } from 'recoil';
import { ScheduleState } from '@recoil/atoms/scheduleAtom';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';

export const ScheduleSelector = selector<ISchedule>({
  key: 'ScheduleSelector',
  get({ get }) {
    return get(ScheduleState);
  },
  set({ set, get }, newValue) {
    // console.log(newValue)
    const oldValue = get(ScheduleState);
    // perform a deep object comparison
    if (!_(newValue, oldValue, { strict: true })) {
      console.log('OV: ', oldValue, ' NV: ', newValue);
      set(ScheduleState, newValue);
    } // end if
  }, // end set
}); // end selector
