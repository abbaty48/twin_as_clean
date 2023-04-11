import { IStateAction, StateActions } from '@stores/store';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';
import { IMaterial } from '@/src/commons/models/interfaces/imaterial';

const sumTotalPrice = (selectedMaterials: IMaterial[]) => {
  const _totalSum = selectedMaterials.reduce((totalAmount, currentMaterial) => {
    return (totalAmount += currentMaterial.price * currentMaterial.quantity);
  }, 0);
  return {
    totalAmountOnline: _totalSum,
    totalAmountOnPickup: _totalSum + 2000,
  };
};

export const scheduleReducer = (
  state: ISchedule,
  action: IStateAction
): ISchedule => {
  const { type, payload } = action;

  switch (type) {
    case StateActions.SET_LOCATION:
      return {
        ...state,
        location: payload,
      };

    case StateActions.SET_PHONENUMBER:
      return {
        ...state,
        phoneNumber: payload,
      };

    case StateActions.SET_STATES:
      return {
        ...payload,
        totalAmountOnline: sumTotalPrice(
          (payload as ISchedule).selectedMaterials
        ).totalAmountOnline,
        totalAmountOnPickup: sumTotalPrice(
          (payload as ISchedule).selectedMaterials
        ).totalAmountOnPickup,
      };

    case StateActions.SET_SELECTED_MATERIALS:
      return {
        ...state,
        selectedMaterials: payload,
        totalAmountOnline: sumTotalPrice(
          (payload as ISchedule).selectedMaterials
        ).totalAmountOnline,
        totalAmountOnPickup: sumTotalPrice(
          (payload as ISchedule).selectedMaterials
        ).totalAmountOnPickup,
      };

    case StateActions.SET_UNSELECTED_MATERIALS:
      return {
        ...state,
        selectedMaterials: payload,
        totalAmountOnline: sumTotalPrice(
          (payload as ISchedule).selectedMaterials
        ).totalAmountOnline,
        totalAmountOnPickup: sumTotalPrice(
          (payload as ISchedule).selectedMaterials
        ).totalAmountOnPickup,
      };
    default:
      return state;
  }
};
