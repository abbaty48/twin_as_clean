import _ from 'deep-equal';
import { atom } from 'recoil';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';

export const ScheduleState = atom<ISchedule>({
  key: 'ScheduleState',
  default: {
    location: '',
    phoneNumber: '',
    materials: [],
    selectedMaterials: [],
    unSelectedMaterials: [],
    totalAmountOnline: 0,
    totalAmountOnPickup: 0,
  },
});
