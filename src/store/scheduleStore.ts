import { createStore, action } from 'easy-peasy';
import { ISchedule } from '@commons/models/interfaces/ischedule';

export const scheduleStore = createStore<ISchedule>({
  location: '',
  phoneNumber: '',
  materials: [],
  selectedMaterials: [],
  unSelectedMaterials: [],
  totalAmountOnline: 0,
  totalAmountOnPickup: 0,
  
});
