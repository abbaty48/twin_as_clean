import { atom } from 'recoil';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';

export const ScheduleState = atom<ISchedule>({
  key: 'ScheduleState',
  default: {
    phoneNumber: '',
    location: '',
    cloths: [],
    totalAmountOnline: 0,
    totalAmountOnPickup: 0,
  },
  // effects_UNSTABLE: [
  //   ({ onSet, setSelf }) => {
  //     onSet(async (newValue, oldValue) => {
  //       if(newValue === oldValue) return;
  //       setSelf(newValue);
  //     });
  //   },
  // ],
});
