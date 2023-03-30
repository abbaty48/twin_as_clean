import { IMaterial } from '@models/interfaces/imaterial';
import { Action } from 'easy-peasy';

export interface ISchedule {
  phoneNumber: string;
  location: string;
  totalAmountOnline?: number;
  totalAmountOnPickup?: number;
  materials: IMaterial[];
  selectedMaterials: IMaterial[];
  unSelectedMaterials: IMaterial[];
  saveLocation: Action<String>;
}
