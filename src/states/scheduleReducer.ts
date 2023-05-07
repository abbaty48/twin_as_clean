import { StateAction } from './scheduleState';
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
  states: ISchedule,
  action: StateAction
): ISchedule => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_LOCATION':
      return {
        ...states,
        location: payload,
      };

    case 'SET_PHONENUMBER':
      return {
        ...states,
        phoneNumber: payload,
      };

    case 'SET_STATES':
      return {
        ...payload,
        totalAmountOnline: sumTotalPrice(
          (payload as ISchedule).selectedMaterials
        ).totalAmountOnline,
        totalAmountOnPickup: sumTotalPrice(
          (payload as ISchedule).selectedMaterials
        ).totalAmountOnPickup,
      };

    case 'SET_SELECTED_MATERIAL': {
      const selectedMaterials = [payload, ...states.selectedMaterials];
      const unSelectedMaterials = states.unSelectedMaterials.filter(
        (materials) => !selectedMaterials.includes(materials)
      );
      const { totalAmountOnPickup, totalAmountOnline } =
        sumTotalPrice(selectedMaterials);
      return {
        ...states,
        selectedMaterials,
        unSelectedMaterials,
        totalAmountOnline,
        totalAmountOnPickup,
      };
    }

    case 'SET_UNSELECTED_MATERIAL': {
      const selectedMaterials = states.selectedMaterials.filter(
        (materials) => materials.id !== payload.id
      );
      const unSelectedMaterials = [payload, ...states.unSelectedMaterials];
      const { totalAmountOnPickup, totalAmountOnline } =
        sumTotalPrice(selectedMaterials);
      return {
        ...states,
        selectedMaterials,
        unSelectedMaterials,
        totalAmountOnline,
        totalAmountOnPickup,
      };
    }

    case 'CHANGE_SELECTED_MATERIAL': {
      const selectedMaterials = [
        payload.destMaterial,
        ...states.selectedMaterials.filter(
          (material) => material.id !== payload.sourceMaterial.id
        ),
      ];
      const unSelectedMaterials = [
        payload.sourceMaterial,
        ...states.unSelectedMaterials.filter(
          (material) => material.id !== payload.destMaterial.id
        ),
      ];
      const { totalAmountOnline, totalAmountOnPickup } =
        sumTotalPrice(selectedMaterials);
      return {
        ...states,
        selectedMaterials,
        unSelectedMaterials,
        totalAmountOnline,
        totalAmountOnPickup,
      };
    }

    case 'SET_MATERIAL_QUANTITY': {
      const selectedMaterials = states.selectedMaterials.map((material) => {
        if (material.id === payload.materialID) {
          return {
            ...material,
            quantity: payload.quantity,
          };
        }
        return material;
      });
      const { totalAmountOnPickup, totalAmountOnline } =
        sumTotalPrice(selectedMaterials);
      return {
        ...states,
        selectedMaterials,
        totalAmountOnline,
        totalAmountOnPickup,
      };
    }
    default:
      return states;
  }
};
