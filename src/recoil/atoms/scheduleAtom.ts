import { atom } from 'recoil';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';

export const ScheduleState = atom<ISchedule>({
  key: 'ScheduleState',
  default: {
    phoneNumber: '',
    location: '',
    cloths: [],
  },
});
