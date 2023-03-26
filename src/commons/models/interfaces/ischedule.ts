import { IMaterial } from '@models/interfaces/imaterial';

export interface ISchedule {
  phoneNumber: string;
  location: string;
  cloths: IMaterial[];
  totalAmountOnline?: number;
  totalAmountOnPickup?: number;
}
