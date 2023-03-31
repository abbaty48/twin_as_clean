import { IMaterial } from '@models/interfaces/imaterial';

export interface ISchedule {
  phoneNumber: string;
  location: string;
  totalAmountOnline?: number;
  totalAmountOnPickup?: number;
  materials: IMaterial[];
  selectedMaterials: IMaterial[];
  unSelectedMaterials: IMaterial[];
}
