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
  effects_UNSTABLE: [
    ({ onSet, setSelf }) => {
      onSet((newValue: ISchedule, oldValue: any) => {
        // console.log('#1');
        if (!_(newValue, oldValue, { strict: true })) {
          // console.log('#2');
          setSelf(newValue);
        }
        return;
      });
    },
  ],
});
